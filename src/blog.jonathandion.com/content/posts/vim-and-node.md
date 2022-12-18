---
title: "vim and javascript"
date: 2019-04-25T16:34:15-04:00
---

I really like vim. I can do everything that an IDE provides without the bloat. If you need a feature in vim, you need to do it yourself or use a plugin. That’s the power of vim, you can build your own text editor.

If you are coding in javascript, here some of the commands and plugins that I use on a daily base:

## plugins

- [vim-node](https://github.com/moll/vim-node)
- [vim-test](https://github.com/janko/vim-test)

for snippets:

- [ultisnips](https://github.com/sirver/ultisnips)
- [vim-snippets](https://github.com/honza/vim-snippets)

## commands

to debug in chrome:

```
command NodeDebug exec ":! node --inspect-brk %<cr>"
```

to debug mocha in chrome:

```
command NodeDebugMocha exec ":! npx mocha --inspect-brk %<cr>"
```

to format a json file:

```
command PrettyJson exec ":%!jq '.'"
```
