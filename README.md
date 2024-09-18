# 環境構築手順
このプロジェクトの開発環境をセットアップするために、以下を実行してください。

## 必要なパッケージをインストール
```bash  
npm install
```

## 開発サーバーの起動
開発用のローカルサーバーを起動するには、以下のコマンドを実行します。
これにより、ホットリロード対応の開発環境が立ち上がります。
```bash  
npm run start
```

## コードのフォーマットとLintチェック
### コードのフォーマット
```bash  
npm run format
```

### JavaScriptのLintチェック
```bash  
npm run lint:js
```

### CSSのLintチェック
```bash  
npm run lint:css
```

### HTMLのLintチェック
```bash  
npm run lint:html
```

### すべてのチェックを一括に実行
```bash  
npm run check
```

## ビルド
```bash  
npm run build
```
