%: %.cpp Makefile
	g++ -std=c++14 -O2 -Wall -Wextra -Wconversion -Wshadow -Wfatal-errors -static $< -o $@

%_debug: %.cpp Makefile
	g++ -g -fsanitize=address,undefined $< -o $@