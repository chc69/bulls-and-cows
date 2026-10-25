# 1A2B 猜數字遊戲


純前端的 1A2B（Bulls & Cows）猜數字小遊戲，無任何依賴，直接打開 `index.html` 即可遊玩。

## 玩法

- 電腦隨機產生 4 位數字（每位互不相同，可能 0 開頭）。
- 輸入 4 位數猜測（每位也必須互不相同）。
- 回饋 `xAyB`：
  - **A** = 數字正確且位置正確
  - **B** = 數字正確但位置錯誤
- 猜到 `4A0B` 即勝利。
- 最佳紀錄（最少嘗試次數）會存在瀏覽器 `localStorage`。

## 本機遊玩

直接用瀏覽器打開 `index.html`：

```bash
open index.html   # macOS
```

## 部署到 GitHub Pages

1. 初始化 git 並推到 GitHub：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. 進入 GitHub repo → **Settings** → **Pages**。
3. **Source** 選擇 `Deploy from a branch`，Branch 選 `main` / `(root)`。
4. 等約 1 分鐘，遊戲會出現在 `https://<your-username>.github.io/<repo-name>/`。
5. 把網址分享給朋友即可。

## 檔案結構

```
.
├── index.html   # 頁面結構
├── style.css    # 樣式（深色主題、響應式）
├── game.js      # 遊戲邏輯
└── README.md
```
