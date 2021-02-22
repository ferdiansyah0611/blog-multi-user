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
                $id = base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000));
                $avatar->move(WRITEPATH.'uploads/'. $_POST['id']);
                $this->sendingmail($email, '
                    <div class="header p-5">
                        <h2 style="font-size: 30px;text-align:center;">Go Blog</h2>
                        <hr class="divider"/>
                    </div>
                    <div style="font-size: 20px;text-align:center;">
                        <p>Verification Code</p>
                        <button>'. $id .'</button>
                    </div>
                ');
                $output = [
                    'message' => 'Successfully Register. Please verified code by email to free access Go Blog!'
                ];
                $db = \Config\Database::connect();
                $db->table('app_verification_code')->insert([
                    'id' => rand(),
                    'user_id' => $_POST['id'],
                    'code' => $id,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
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
                $verified = \Config\Database::connect()->table('app_verification_code')->where('user_id', $cek_login['id'])->get()->getResult();
                if(count($verified) == 1)
                {
                    foreach ($verified as $key => $value) {
                        if($value->verified_at !== null)
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

                        }
                        else{
                            return $this->respond(['message' => 'The email has not verification'], 400);
                        }
                    }
                }
                else{
                    return $this->respond(['message' => 'The email has not verification'], 400);
                }
            } else {
                $output = [
                    'status' => 401,
                    'message' => 'email or password is wrong',
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
    public function resetcode()
    {
        $db = \Config\Database::connect()->table('app_verification_code');
        $user = \Config\Database::connect()->table('app_user')->where('email', $this->request->getGet('email'))->get()->getRow();
        if($user->id)
        {
            $result = $db->where('user_id', $user->id)->get()->getResult();
            if(count($result) == 1)
            {
                foreach ($result as $key => $value) {
                    if($value->verified_at == null || $value->verified_at !== date('Y-m-d'))
                    {
                        $id = base64_encode(';' . rand() . ';Go_Blog;' . rand(100,10000));
                        $db->update(['code' => $id, 'verified_at' => null], ['user_id' => $user->id]);
                        $this->sendingmail($user->email, '
                            <div class="header" style="background-color: black;padding:2px;color:white;">
                                <h2 style="font-size: 30px;text-align:center;">Go Blog | Verification Code</h2>
                                <hr class="divider"/>
                                <div style="padding:10px;">
                                    <button style="padding: 5px;outline:none;background-color: #7e76ff;">'. $id .'</button>
                                </div>
                            </div>
                        ');
                        return $this->respond(['message' => 'The code has reset. Please check your email']);
                    }
                    else{
                        return $this->respond(['message' => 'The email has verified'], 400);
                    }
                }
            }
            if(count($result) == 0)
            {
                return $this->respond(['message' => 'The code is wrong'], 400);
            }
            else{
                return $this->respond(['message' => 'The email has verified'], 400);
            }

        }
    }
    public function verifiedcode()
    {
        $db = \Config\Database::connect()->table('app_verification_code');
        $result = $db->where('code', $this->request->getGet('code'))->get()->getResult();
        if(count($result) == 1)
        {
            foreach ($result as $key => $value) {
                if($value->verified_at == null || $value->verified_at !== date('Y-m-d'))
                {
                    $db->update(['verified_at' => date('Y-m-d')], ['code' => $this->request->getGet('code')]);
                    return $this->respond(['message' => 'Thanks you for verification code. Now you can access Go Blog in free.']);
                }
                else{
                    return $this->respond(['message' => 'The email has verified'], 400);
                }
            }
        }
        if(count($result) == 0)
        {
            return $this->respond(['message' => 'The code is wrong'], 400);
        }
        else{
            return $this->respond(['message' => 'The email has verified'], 400);
        }
    }
    public function sendingmail($emls, $msg)
    {
        $email = \Config\Services::email();
        $config['protocol'] = getenv('email.protocol');
        $config['SMTPHost'] = getenv('email.SMTPHost');
        $config['SMTPUser'] = getenv('email.SMTPUser');
        $config['SMTPPass'] = getenv('email.SMTPPass');
        $config['SMTPPort'] = getenv('email.SMTPPort');
        $config['mailType'] = getenv('email.mailType');
        $config['mailPath'] = getenv('email.mailPath');
        $config['charset']  = getenv('email.charset');
        $config['wordWrap'] = getenv('email.wordWrap');
        $config['SMTPCrypto'] = getenv('email.SMTPCrypto');
        $email->initialize($config);

        $email->setFrom('ferdif9996@gmail.com', 'Go Blog');
        $email->setTo($emls);
        $email->setSubject('Go Blog');
        $email->setMessage($msg);
        $email->send();
        return true;
    }
    public function sendcontactus()
    {
        $this->sendingmail('ferdif9996@gmail.com', '
            <div class="header" style="background-color: black;padding:2px;color:white;">
                <h2 style="font-size: 30px;text-align:center;">Go Blog | Contact US</h2>
                <hr class="divider"/>
                <div style="padding:10px;">
                    <p><b>From</b> : '. $this->request->getPost('name').'</p>
                    <p><b>Email</b> : '. $this->request->getPost('email') .'</p>
                    <p><b>Description : </b>'. $this->request->getPost('description') .'</p>
                </div>
            </div>
        ');
        return $this->respond(['message' => 'Send is successfully']);
    }
}