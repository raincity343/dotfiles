#include <bits/stdc++.h>
using namespace std;

#define rep(i, a, b) for (int i = (a); i <= (b); ++i)
#define sz(x) (int)(x).size()
using ll = long long;

mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());
ll rand(ll l, ll r) { return uniform_int_distribution<ll>(l, r)(rng); }

int main() {
  cin.tie(0)->sync_with_stdio(0);
}