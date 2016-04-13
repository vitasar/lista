" Vim5 and later versions support syntax highlighting. Uncommenting the next
" line enables syntax highlighting by default.
if has("syntax")
  syntax on
endif

" If using a dark background within the editing area and syntax highlighting
" turn on this option as well
syntax enable
set background=dark

" 256-color terminal
set t_Co=256
colorscheme elford

set tabstop=2
set shiftwidth=2
set softtabstop=2
set smarttab
set autoindent
set expandtab
set et

set wrap
set linebreak

set showmatch
set matchpairs+=<:>
set hlsearch
set incsearch
set ignorecase
set smartcase
set gdefault

set lz

set listchars=tab:··,nbsp:~,trail:·
set list

set laststatus=2
set number

" Source a global configuration file if available
if filereadable("/etc/vim/vimrc.local")
  source /etc/vim/vimrc.local
endif
