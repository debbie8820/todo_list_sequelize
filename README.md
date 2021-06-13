# todo_list_sequelize

運用MySQL及其ORM Sequelize進行操作，在Node.js打造的備忘清單<br>

<img alt="homepage" src="https://github.com/debbie8820/todo_list_sequelize/blob/main/img/home.jpg">

<img alt="homepage" src="https://github.com/debbie8820/todo_list_sequelize/blob/main/img/login.jpg">

### 主要功能
+ 使用者驗證
  -本地驗證
  -Facebook驗證
+ 新增單筆代辦事項
+ 顯示單筆代辦事項細節
+ 編輯單筆代辦事項
+ 刪除單筆代辦事項

### 建置環境

- [Node.js](https://nodejs.org/en/)：14.16.1
- [Express](https://www.npmjs.com/package/express)：4.17.1
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)：5.3.2
- [MySQL](https://www.mysql.com/) - v8.0.16

## 安裝與執行

1. clone 此專案至本機電腦

   ```
   $ git clone https://github.com/debbie8820/todo_list_sequelize.git
   ```

2. 進入專案資料夾並安裝

   ```
   $ cd todo_list_sequelize
   $ npm install
   ```

3. 匯入種子資料並啟動伺服器

   ```
   $ npm run seed
   $ npm run dev
   ```

4. 執行成功後，終端機會顯示下列訊息

   ```
   App is running on PORT 3000
   ```

5. 使用下列 URL 於瀏覽器上進行瀏覽

   ```
   http://localhost:3000
   ```

6. 種子資料已建構完畢，可使用下列資訊登入：
   ```
   姓名：root
   信箱: root@example.com
   密碼: 12345678
   ```

## 開發者

Debbie Chang