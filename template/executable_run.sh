#!/bin/bash
set -e
trap "notify-send WA" ERR
i=1
make sol
while [[ -f in$i ]]; do
    echo $i
    ./sol < in$i > out$i
    diff -Zq out$i ans$i
    ((++i))
done
make gen
make good
for ((i = 1;; ++i)); do
    echo $i
    ./gen > in
    ./sol < in > out
    ./good < in > ans
    diff --color=auto -Z out ans
done