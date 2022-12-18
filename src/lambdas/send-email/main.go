package main

import (
  "fmt"
  "errors"
  "os"
  "github.com/aws/aws-lambda-go/lambda"
  "github.com/sendgrid/sendgrid-go"
  "github.com/sendgrid/sendgrid-go/helpers/mail"
)

type Event struct {
  Name string `json:"name"`
  Email string `json:"email"`
  Message string `json:"message"`
}

type Response struct {
  Error string `json:"error"`
}

const EMAIL string = "jonathandionalary@gmail.com"

var SEND_GRID_KEY string = os.Getenv("SEND_GRID_API_KEY")

func SendEmail(params Event) (Response, error) {
  from := mail.NewEmail(params.Name, params.Email)
  subject := "jonathandion.com | Somebody sent you a message!"
  to := mail.NewEmail("Jonathan Dion", EMAIL)
  plainTextContent := params.Message
  htmlContent := params.Message
  message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
  client := sendgrid.NewSendClient(SEND_GRID_KEY)
  response, err := client.Send(message)

  if err != nil {
    fmt.Println("[ERROR]", err)
    return Response { Error: "An error occured" }, err
  } else {
    fmt.Println("[DEBUG]", response)
    return Response { Error: "" }, nil
  }
}

func HandleRequest(event Event) (Response, error) {
  name, email, message := event.Name, event.Email, event.Message

  if name == "" || email == "" || message == "" {
    return Response{}, errors.New("Fields name, email, message are required!")
  }

  response, err := SendEmail(event)

  if err != nil {
    return response , err
  } else {
    return response, nil
  }
}

func main() {
  lambda.Start(HandleRequest)
}
