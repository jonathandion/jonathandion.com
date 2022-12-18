package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Server: localhost:3000")
	http.Handle("/", http.FileServer(http.Dir("../")))
	http.ListenAndServe(":3000", nil)
}
