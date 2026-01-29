#include <bits/stdc++.h>
using namespace std;

#define rep(i, a, b) for (int i = (a); i <= (b); ++i)
#define sz(x) (int)(x).size()
using ll = long long;

mt19937_64 rng(chrono::system_clock::now().time_since_epoch().count());
template <class T> T rnd(T l, T r) { return uniform_int_distribution<T>(l, r)(rng); }

int main() {
    cin.tie(0)->sync_with_stdio(0);
}