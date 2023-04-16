# 麻雀videoview(chrome 拡張)

## 大まかな機能
- video tagの位置を取ってくる。
- 相対的な位置を選択してもらう
- クラスタ数を選択(4)
- 一定間隔でvideo tag箇所全体をスクショ(html2canvas)
- 選択箇所を切り抜き
- スクショの切り抜き箇所を特徴量化(ml5 featureextractor)(https://himco.jp/2018/12/28/3_1%EF%BC%9A%E7%89%B9%E5%BE%B4%E6%8A%BD%E5%87%BAfeature-extraction/)
- 事前処理
  - Dbscanでクラスタリング(https://qiita.com/norimy/items/e961840cf3736386c384)
    - ちょうど4になるまでeps距離をにぶたん
    - Coreから到達できる点とeps距離だけ取っておく
- オンライン
  - 残した点との距離計算。min distの点のクラスタと判別。
  - Epsより小さければ
    - 該当するクラスタに相当する窓にスクショをアップロード

Class
- プロパティ
  - 追加する窓
  - video
  - 画像の比の位置
  - 事前処理諸々

- できるかわからん点
  - 選択箇所をもらうところ
  - manufestでのmatchの追加→browser_actionでやればいいのでやる必要なし
    - クラスタ数とかの受け取り方→browser_actionでできる
    - 選択箇所も一応可能(上下右左の数値指定)
    - 開始ボタン.on_clickであとはできる
  - 窓を追加するところ(多分大丈夫)

## TODO

- popup
  - html
    - 窓の大きさ
    - 切り抜く相対位置
    - クラスタ数
    - スクショの間隔
  - js
    - videoタグの相対位置に強調入れる
- contentScripts→全部popupでok
  - DBSCAN
  - feature-extractor
  - html2canvas
- いらんもの消す
