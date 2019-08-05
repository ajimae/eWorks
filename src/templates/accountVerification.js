import { config } from 'dotenv';
import Encrytion from '../helpers/Encryption';

config();
const { encrypt } = Encrytion;

const accountVerification = data => (
  `<div style="background:#f0f0f0;margin:0 auto;
  padding-top:50px;padding-bottom:50px;text-align:center;
  width:100%;font-size:12px;font-family:verdana;border-radius:5px;color:#444">
  <div>
      <img src=https://res.cloudinary.com/dstvcmycn/image/upload/v1543246158/Author%27s%20Haven/Asset_1_4x.png width="70px" height="70px">
  </div>
  <h2>Welcome to Electronic Works, ${data.firstName}</h2><br>
  <p>Please click the button below to verify your account.<p>
<div style="margin: 50px 50px">
  <p><a style="background:#e66869;box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    color:white;text-decoration:none;text-align:center;padding:13px 20px;border-radius:25px;
    border:0.5px solid #e66869;"
         href="${process.env.BASE_URL}/api/v1/users/verify?id=${encrypt(data.email)}">Verify your account
      </a>
  </p>
</div>
<p style="margin-top:50px;">
  If you didn't sign up an account on <strong>Electronic Works</strong> please ignore this email</p><br>
  <span style="font-family:sans-serif;font-size:10px">&copy; ${new Date().getFullYear()}, Electronic Works</span>
</div>`
);

export default accountVerification;
