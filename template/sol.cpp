#include <bits/stdc++.h>
using namespace std;

#define rep(i, a, b) for (int i = (a); i <= (b); ++i)
#define sz(x) (int)(x).size()
using ll = long long;

template <class T> struct Range {
  T b, e;
};
template <class T> Range<T> range(T b, T e) { return {b, e}; }

struct debug {
  debug() { cerr << "\e[36m"; }
  ~debug() { cerr << "\e[0m\n"; }

  template <class T> auto test(T x) -> decltype(cerr << x, 0);
  char test(...);

  template <class T> debug& operator<<(T x) {
    if constexpr (sizeof test(x) > 1) cerr << boolalpha << x;
    else *this << range(begin(x), end(x));
    return *this;
  }

  template <class T, class U> debug& operator<<(pair<T, U> x) {
    return *this << "(" << x.first << ", " << x.second << ")";
  }

  template <class T> debug& operator<<(Range<T> x) {
    *this << "[";
    for (T i = x.b; i != x.e; ++i) *this << ", " + 2 * (i == x.b) << *i;
    return *this << "]";
  }
};

#define expr(e) "[" #e "]: " << (e) << " "

int main() {
  cin.tie(0)->sync_with_stdio(0);
}