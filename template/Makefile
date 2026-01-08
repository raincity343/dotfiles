%: %.cpp Makefile
	g++ -std=c++14 -O2 -Wall -Wfatal-errors -static $< -o $@

%_debug: %.cpp Makefile
	g++ -g -fsanitize=address,undefined $< -o $@