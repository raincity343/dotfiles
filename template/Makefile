%: %.cpp Makefile
	g++ -std=c++14 -O2 -Wall -Wextra -Wconversion -Wshadow -Wfatal-errors -static $< -o $@

%d: %.cpp Makefile
	g++ -g -fsanitize=address,undefined $< -o $@