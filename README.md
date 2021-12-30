# Who Pay ユーザー側アプリ

# 環境構築

0. このリポジトリをクローン
```
git clone https://github.com/Persona-Product/who-pay-user.git
```

1. Expoのcliをインストール
```
npm install --global expo-cli
```

2. パッケージをインストール
```
yarn install
```

3. 開発アプリ立ち上げ  

**エミュレーターで確認する場合**  
（事前にAndroidStudioを立ち上げておく）
```
yarn android
```

**Expoアプリを使って自分のスマホで確認する場合**
```
yarn start --tunnel
```
ブラウザかコマンドラインに表示されたQRコードをカメラで読み取る  
（もしたらExpoのアカウント登録が必要かも？）