const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

// MSSQL bağlantı ayarları
const config = {
    user: 'sa',
    password: 'm123m1',
   server: 'localhost', 
   database: 'ecommerce',
    options: {
        enableArithAbort: true,
        encrypt: false,
    },
};

// MSSQL bağlantısını oluştur
async function connectDB() {
    try {
        await mssql.connect(config);
        console.log('MSSQL veritabanına bağlandı.');
    } catch (error) {
        console.error('MSSQL bağlantı hatası:', error);
    }
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/products', async (req, res) => {
    try {
      const pool = await mssql.connect(config);
      const result = await pool.request().query('SELECT * FROM Products');
      res.json(result.recordset);
    } catch (error) {
      console.error('Ürünleri getirirken hata oluştu:', error);
      res.status(500).send('Sunucu hatası.');
    }
  });


app.get('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const pool = await mssql.connect(config);
      const result = await pool.request()
        .input('id', mssql.Int, productId)
        .query('SELECT * FROM Products WHERE Id = @id');
  
      if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
      } else {
        res.status(404).send('Ürün bulunamadı.');
      }
    } catch (error) {
      console.error('Ürün getirilirken hata oluştu:', error);
      res.status(500).send('Sunucu hatası.');
    }
  });
  
app.post('/users/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Basit veri doğrulama
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'Lütfen tüm alanları doldurun.' });
      }
  
      // Email kullanımda mı kontrolü
      const pool = await mssql.connect(config);
      const emailCheckResult = await pool.request()
        .input('email', mssql.NVarChar, email)
        .query('SELECT 1 FROM Users WHERE Email = @email');
  
      if (emailCheckResult.recordset.length > 0) {
        return res.status(400).json({ message: 'Bu email adresi zaten kullanımda.' });
      }
  
      // Şifreyi hashleme
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Yeni kullanıcıyı veritabanına ekleme
      const result = await pool.request()
        .input('name', mssql.NVarChar, name)
        .input('email', mssql.NVarChar, email)
        .input('password', mssql.NVarChar, hashedPassword)
        .query('INSERT INTO Users (Name, Email, Password) OUTPUT INSERTED.Id VALUES (@name, @email, @password)');
  
        if (result.rowsAffected[0] === 1) { // Eklenen satır sayısını kontrol et
            const newUserId = result.recordset[0].Id; 
            res.status(201).json({ message: 'Kullanıcı başarıyla oluşturuldu.', userId: newUserId });
          } else {
            console.error('Kullanıcı eklenemedi!'); 
            res.status(500).send('Kullanıcı kaydı oluşturulurken bir hata oluştu.');
          }
    } catch (error) {
      console.error('Kullanıcı kaydı oluşturulurken hata:', error);
      res.status(500).send('Sunucu hatası.');
    }
  });

app.post('/users/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const pool = await mssql.connect(config);
      const result = await pool.request()
        .input('email', mssql.NVarChar, email)
        .query('SELECT * FROM Users WHERE Email = @email');
  
      if (result.recordset.length === 0) {
        return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
      }
  
      const user = result.recordset[0];
  
      // Şifre kontrolü
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Geçersiz email veya şifre.' });
      }
  
      // JWT veya benzeri bir token oluşturabilirsiniz
      const token = 'oluşturulanToken'; // Örnek token
  
      res.json({ message: 'Giriş başarılı.', token });
    } catch (error) {
      console.error('Giriş yapılırken hata:', error);
      res.status(500).send('Sunucu hatası.');
    }
  });


// Bağlantıyı başlat
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Sunucu ${port} portunda çalışıyor.`);
    });
});