%: %.cpp
	g++ -std=c++14 -O2 -Wall -Wfatal-errors $< -o $@

%_debug: %.cpp Makefile
	g++ -g -fsanitize=address $< -o $@