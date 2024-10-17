const express = require('express');
const xlsx = require('xlsx');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const readExcel = () => {
  const workbook = xlsx.readFile('students.xlsx'); // اسم ملف الاكسيل
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Tadaima</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            direction: rtl; /* إضافة اتجاه RTL */
          }
          .container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            width: 300px;
            text-align: center;
          }
          h1 {
            margin-bottom: 20px;
            color: #333;
          }
          input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            text-align: right; /* محاذاة النص إلى اليمين */
          }
          button {
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            transition: background-color 0.3s;
          }
          button:hover {
            background-color: #45a049;
          }
          .styled-paragraph {
            font-size: 11px;
            line-height: 1.6;
            color: #333;
            text-align: justify;
            background-color: #B9FBC0;
            border-left: 5px solid #4CAF50;
            padding: 10px 15px;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>إدخال كود المتدرب</h1>
          <form action="/student" method="post">
            <input type="text" name="code" placeholder="أدخل كود الطالب" required>
            <button type="submit">ارســال</button>
            <p class ="styled-paragraph">هذا البرنامج تم تطويره بواسطة م/ عبدالرحمن، عضو فريق Tadaima</p>
          </form>
        </div>
      </body>
    </html>
  `);
});



app.post('/student', (req, res) => {
  const code = req.body.code;
  const students = readExcel();
  const student = students.find(s => s.Code == code);

  if (student) {
    const testLinkOne = 'https://forms.gle/1qJbCRhptcj3MtYW9';
    const sessionOne = '';
    res.send(`
<html>
  <head>
    <title>Tadaima</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        direction: rtl; /* إضافة اتجاه RTL */
      }
      .container {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px; /* أقصى عرض للحاوية */
        text-align: center;
      }
      h1 {
        color: #333;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: right;
      }
      th {
        background-color: #4CAF50;
        color: white;
      }
      a {
        display: inline-block;
        margin-top: 10px;
        color: #4CAF50;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
    <h2>بيانات المتدرب: ${student.Name}</h2>
      <h4>الكود: ${student.Code}</h4>
      <table>
        <tr>
          <th>العنصر</th>
          <th>المحتوي</th>
        </tr>
        <tr>
          <td><strong>نتيجة الاختبار الاول:</strong></td>
          <td>15 / ${student.Grade1}</td>
        </tr>
      </table>
      <a href="/">رجوع</a>
    </div>
  </body>
</html>
    `);
  } else {
    res.send(`
      <html>
        <head>
          <title>خطأ</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              direction: rtl; /* إضافة اتجاه RTL */
            }
            .container {
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
              width: 300px;
              text-align: center;
            }
            h1 {
              color: #ff0000;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>خطأ</h1>
            <p>لا يوجد بيانات لهذا المتدرب</p>
            <a href="/">رجوع</a>
          </div>
        </body>
      </html>
    `);
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
