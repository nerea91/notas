test -s ~/.alias && . ~/.alias || true
export PS1="root \[\033]0;\u@\h:\w\007\]\[\033[01;31m\]\h\[\033[01;34m\] \W \$\[\033[00m\] "