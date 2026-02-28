;; 新版 emacs 不需要刷新词典
(defvar ispell-menu-map-needed nil)

;; 用 elpaca 代替 package.el
(setq package-enable-at-startup nil)

;; 简化用户界面
(setq inhibit-startup-screen t)
(tool-bar-mode -1)