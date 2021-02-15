<?php namespace App\Controllers;
 
use \Firebase\JWT\JWT;
use App\Models\Auth_model;
use CodeIgniter\RESTful\ResourceController;

class AuthController extends ResourceController
{
    public function __construct()
    {
        $this->auth = new Auth_model();
    }
 
    public function privateKey()
    {
        $privateKey = <<<EOD
            -----BEGIN RSA PRIVATE KEY-----
            MIICXAIBAAKBgQC8kGa1pSjbSYZVebtTRBLxBz5H4i2p/llLCrEeQhta5kaQu/Rn
            vuER4W8oDH3+3iuIYW4VQAzyqFpwuzjkDI+17t5t0tyazyZ8JXw+KgXTxldMPEL9
            5+qVhgXvwtihXC1c5oGbRlEDvDF6Sa53rcFVsYJ4ehde/zUxo6UvS7UrBQIDAQAB
            AoGAb/MXV46XxCFRxNuB8LyAtmLDgi/xRnTAlMHjSACddwkyKem8//8eZtw9fzxz
            bWZ/1/doQOuHBGYZU8aDzzj59FZ78dyzNFoF91hbvZKkg+6wGyd/LrGVEB+Xre0J
            Nil0GReM2AHDNZUYRv+HYJPIOrB0CRczLQsgFJ8K6aAD6F0CQQDzbpjYdx10qgK1
            cP59UHiHjPZYC0loEsk7s+hUmT3QHerAQJMZWC11Qrn2N+ybwwNblDKv+s5qgMQ5
            5tNoQ9IfAkEAxkyffU6ythpg/H0Ixe1I2rd0GbF05biIzO/i77Det3n4YsJVlDck
            ZkcvY3SK2iRIL4c9yY6hlIhs+K9wXTtGWwJBAO9Dskl48mO7woPR9uD22jDpNSwe
            k90OMepTjzSvlhjbfuPN1IdhqvSJTDychRwn1kIJ7LQZgQ8fVz9OCFZ/6qMCQGOb
            qaGwHmUK6xzpUbbacnYrIM6nLSkXgOAwv7XXCojvY614ILTK3iXiLBOxPu5Eu13k
            eUz9sHyD6vkgZzjtxXECQAkp4Xerf5TGfQXGXhxIX52yH+N2LtujCdkQZjXAsGdm
            B2zNzvrlgRmgBrklMTrMYgm1NPcW+bRLGcwgW2PTvNM=
            -----END RSA PRIVATE KEY-----
EOD;
        return $privateKey;
    }
    public function register()
    {
        $_POST['id'] = rand();
        $validation =  \Config\Services::validation();
        $validation->setRules([
            'name' => 'required|min_length[3]|max_length[25]',
            'email' => 'required|valid_email|is_unique[app_user.email,id,4]',
            'password' => 'required|min_length[8]|max_length[25]',
            'born' => 'required|min_length[3]|max_length[25]',
            'gender' => 'required|min_length[4]|max_length[6]',
            'location' => 'required|min_length[3]|max_length[50]',
            'avatar' => 'uploaded[avatar]|max_size[avatar,2048]'
        ]);
        if($validation->withRequest($this->request)->run() === true)
        {
            $name = $this->request->getPost('name');
            $email = $this->request->getPost('email');
            $password = $this->request->getPost('password');
            $born = $this->request->getPost('born');
            $gender = $this->request->getPost('gender');
            $location = $this->request->getPost('location');
            $role = 'user';
            $rekening = $this->request->getPost('rekening');
            $type = '0';
            $avatar = $this->request->getFile('avatar');
            $password_hash = password_hash($password, PASSWORD_BCRYPT);
            $dataRegister = [
                'id' => $_POST['id'],
                'name' => $name,
                'email' => $email,
                'password' => $password_hash,
                'born' => $born,
                'gender' => $gender,
                'location' => $location,
                'role' => $role,
                'type' => $type,
                'avatar' => $avatar->getName(),
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ];
            $register = $this->auth->register($dataRegister);
            if($register == true){
                $avatar->move(WRITEPATH.'uploads/'. $_POST['id']);
                $output = [
                    'message' => 'Successfully Register'
                ];
                return $this->respond($output, 200);
            } else {
                $output = [
                    'message' => 'Register Failed'
                ];
                return $this->respond($output, 400);
            }
        }else{
            return $this->respond(['message' => $validation->listErrors()], 403);
        }
    }
    public function login()
    {
        $validation =  \Config\Services::validation();
        $validation->setRules([
            'email' => 'required|valid_email',
            'password' => 'required|min_length[8]|max_length[25]',
        ]);
        if($validation->withRequest($this->request)->run() === true)
        {
            $email = $this->request->getPost('email');
            $password = $this->request->getPost('password');
            $data = $this->request->getJSON(true);
            $cek_login = $this->auth->cek_login($data['email']);
            if(password_verify($data['password'],$cek_login['password']))
            {
                $secret_key = $this->privateKey();
                $issuer_claim = "THE_CLAIM";
                $audience_claim = "THE_AUDIENCE";
                $issuedat_claim = time();
                $notbefore_claim = $issuedat_claim + 10;
                $expire_claim = $issuedat_claim + 7200;
                $token = array(
                    "iss" => $issuer_claim,
                    "aud" => $audience_claim,
                    "iat" => $issuedat_claim,
                    "nbf" => $notbefore_claim,
                    "exp" => $expire_claim,
                    "data" => array(
                        'id' => $cek_login['id'],
                        'name' => $cek_login['name'],
                        'email' => $cek_login['email'],
                        'password' => $cek_login['password'],
                        'born' => $cek_login['born'],
                        'gender' => $cek_login['gender'],
                        'location' => $cek_login['location'],
                        'role' => $cek_login['role'],
                        'type' => $cek_login['type'],
                        'bio' => $cek_login['bio'],
                        'avatar' => $cek_login['avatar'],
                    )
                );
                $token = JWT::encode($token, $secret_key);
                $output = [
                    'status' => 200,
                    'message' => 'Successfully Login',
                    "token" => $token,
                    'csrf_name' => csrf_token(),
                    'csrf_value' => csrf_hash(),
                    "data" => array(
                        'id' => $cek_login['id'],
                        'name' => $cek_login['name'],
                        'email' => $cek_login['email'],
                        'born' => $cek_login['born'],
                        'gender' => $cek_login['gender'],
                        'location' => $cek_login['location'],
                        'role' => $cek_login['role'],
                        'type' => $cek_login['type'],
                        'avatar' => $cek_login['avatar'],
                    ),
                    "expireAt" => $expire_claim
                ];
                return $this->respond($output, 200);
            } else {
                $output = [
                    'status' => 401,
                    'message' => 'Email / Password Wrong',
                    "password" => $data['password']
                ];
                return $this->respond($output, 401);
            }

        }else{
            return $this->respond(['message' => $validation->listErrors()], 403);
        }
    }
    public function check($authHeader)
    {
        $secret_key = $this->privateKey();
        $token = null;
        if($authHeader){
            try {
                $decoded = JWT::decode($authHeader, $secret_key, array('HS256'));
                //print_r($decoded);
                if($decoded){
                    $decoded->{'message'} = 'Access Granted';
                    return $decoded;
                }
            } catch (\Exception $e){
                return false;
            }
        }
    }
    public function valid()
    {
        $check = $this->check($this->request->getGet('token'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
            return $this->respond($check);
        }else{
            return $this->respond(['message' => 'Not Valid Tokens'], 401);
        }
    }
    public function email()
    {
        $email = \Config\Services::email();
        $config['protocol'] = 'smtp';
        $config['SMTPHost'] = 'smtp.gmail.com';
        $config['SMTPUser'] = 'ferdif9996@gmail.com';
        $config['SMTPPass'] = 'lovesafinaforever';
        $config['SMTPPort'] = '587';
        $config['mailType'] = 'html';
        $config['mailPath'] = '/usr/sbin/sendmail';
        $config['charset']  = 'iso-8859-1';
        $config['wordWrap'] = true;
        $config['SMTPCrypto'] = 'tls';
        $email->initialize($config);

        $email->setFrom('ferdif9996@gmail.com', 'Go Blog');
        $email->setTo('ferdisafina123@gmail.com');
        $email->setSubject('Verifaction code | Go Blog');
        $email->setMessage('
            <div class="header p-5">
                <h2 style="font-size: 30px;text-align:center;">Go Blog</h2>
                <hr class="divider"/>
            </div>
            <div style="font-size: 20px;text-align:center;">
                <p>Verification Code</p>
                <button>18293</button>
            </div>');
        $email->send();
        return $this->respond(['message' => 'ok']);
    }
}