export PS1="\[\033]0;\u@\h:\w\007\]\[\033[01;32m\]\u@\h\[\033[01;34m\] \w \$\[\033[00m\] "
export EDITOR=/usr/bin/nano

# Last command visual feedback
PROMPT_COMMAND='if [[ $? -ne 0 ]]; then echo -ne "\033[1;31m:(\033[0m\n";fi'

# Colored man pages
man() {
    # begin blinking
    # begin bold
    # end mode
    # end standout-mode
    # begin standout-mode - info box
    # end underline
    # begin underline

    env LESS_TERMCAP_mb=$(printf "\e[1m") \
    LESS_TERMCAP_md=$(printf "\e[1;32m") \
    LESS_TERMCAP_me=$(printf "\e[0m") \
    LESS_TERMCAP_se=$(printf "\e[0m") \
    LESS_TERMCAP_so=$(printf "\e[1;44;37m") \
    LESS_TERMCAP_ue=$(printf "\e[0m") \
    LESS_TERMCAP_us=$(printf "\e[1;33m") \
    man "$@"
}

# Run "$2 $3 ... $n" in the first upstream directory that contains $1 file
run_upstream()
{
    PIVOT=$1
    ORIGINAL_PWD="$PWD"
    shift
    while [[ "$PWD" != '/' ]] && [[ ! -f "$PIVOT" ]]; do cd ..;done
    if [[ -f "$PIVOT" ]]; then
        "$@"
        cd "$ORIGINAL_PWD"
        return 0
    fi
    echo $PIVOT not found upstream
    cd "$ORIGINAL_PWD"
    return 1
}

xman()
{
    if [ -z "$DISPLAY" ]; then
        man "$@"
    else
        kde-open man:$1
    fi
}


test -s ~/.alias && . ~/.alias || true
