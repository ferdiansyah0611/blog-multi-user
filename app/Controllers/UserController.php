<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;
use App\Models\Auth_model;

class UserController extends ResourceController
{
    protected $modelName = 'App\Models\UserModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
        $this->auth = new Auth_model();
    }

    public function index()
    {
        if($this->request->getGet('search')){
            $search = $this->request->getGet('search');
            $db = \Config\Database::connect();
            $build = $db->table('app_user');
            $data = [
                'data' => $this->model->like('name', $search)->orLike('location', $search)->orLike('email', $search)->paginate(20),
                'total' => $build->like('name', $search)->orLike('location', $search)->orLike('email', $search)->countAllResults()
            ];
            return $this->respond($data);
        }
        if($this->request->getGet('random')){
            $data = [
                'data' => $this->model->orderBy('id', 'RANDOM')->paginate(8)
            ];
            return $this->respond($data);
        }
        else{
            $data = [
                'data' => $this->model->paginate(20),
            ];
            return $this->respond($data);
        }
    }
    public function show($id = null)
    {
        $db = \Config\Database::connect();
        return $this->respond($db->table('app_user')
            ->select('app_user.id, app_user.name, app_user.email, app_user.born, app_user.gender, app_user.location, app_user.role, app_user.type, app_user.avatar, app_user.bio, app_user_ui.profil-cover, app_user.created_at')
            ->join('app_user_ui', 'app_user.id = app_user_ui.user_id', 'left')
            ->where('app_user.id', $id)
            ->get()->getRow());
    }
    public function create()
    {
        $check = $this->protect->check($this->request->getGet('token'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
            if($check->data->role == 'admin'){
                $id = rand(1000000, 10000000);
                $avatar = $this->request->getFile('avatar');
                $password_hash = password_hash($this->request->getPost('password'), PASSWORD_BCRYPT);
                $dataRegister = [
                    'id' => $id,
                    'name' => $this->request->getPost('name'),
                    'email' => $this->request->getPost('email'),
                    'password' => $password_hash,
                    'born' => $this->request->getPost('born'),
                    'gender' => $this->request->getPost('gender'),
                    'location' => $this->request->getPost('location'),
                    'role' => $this->request->getPost('role'),
                    'type' => $this->request->getPost('type'),
                    'avatar' => $avatar->getName(),
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                $register = $this->auth->register($dataRegister);
                if($register == true){
                    $avatar->move(WRITEPATH.'uploads/'. $id);
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
            }
        }
        else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
            if($check->data->role == 'admin'){
                $data = [
                    'name' => $this->request->getPost('name'),
                    'email' => $this->request->getPost('email'),
                    'born' => $this->request->getPost('born'),
                    'gender' => $this->request->getPost('gender'),
                    'location' => $this->request->getPost('location'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                if(($avatar = $this->request->getFile('avatar'))){
                    $avatar->move(WRITEPATH.'uploads/'. $id);
                    $data['avatar'] = $avatar->getName();
                }
                if(!empty($this->request->getPost('role'))){
                    $data['role'] = $this->request->getPost('role');
                }
                if(!empty($this->request->getPost('type'))){
                    $data['type'] = $this->request->getPost('type');
                }
                if(!empty($this->request->getPost('bio'))){
                    $data['bio'] = $this->request->getPost('bio');
                }
    	       $this->model->update_data($data, $id);
               return $this->respond(['message' => 'Successfuly update data']);
            }
            else{
                $data = [
                    'name' => $this->request->getPost('name'),
                    'email' => $this->request->getPost('email'),
                    'born' => $this->request->getPost('born'),
                    'gender' => $this->request->getPost('gender'),
                    'location' => $this->request->getPost('location'),
                    'bio' => $this->request->getPost('bio'),
                    'updated_at' => date('Y-m-d H:i:s')
                ];
                if(($avatar = $this->request->getFile('avatar'))){
                    $avatar->move(WRITEPATH.'uploads/'. $id);
                    $data['avatar'] = $avatar->getName();
                }
                $this->model->update_data($data, $check->data->id);
                return $this->respond(['message' => 'Successfuly update data']);
            }
        }
        else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function delete($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
    	   $this->model->delete_data($id);
        }
        else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function dashboard($year = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $db = \Config\Database::connect();
            $data = [
                'viewers' => [
                    'jan' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-01%')->get()->getRow()->views,
                    'feb' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-02%')->get()->getRow()->views,
                    'mar' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-03%')->get()->getRow()->views,
                    'apr' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-04%')->get()->getRow()->views,
                    'may' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-05%')->get()->getRow()->views,
                    'jun' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-06%')->get()->getRow()->views,
                    'jul' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-07%')->get()->getRow()->views,
                    'aug' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-08%')->get()->getRow()->views,
                    'sep' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-09%')->get()->getRow()->views,
                    'oct' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-10%')->get()->getRow()->views,
                    'nov' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-11%')->get()->getRow()->views,
                    'dec' => $db->table('app_article')->select('SUM(app_article.views) as views')->where(['user_id' => $check->data->id])->like('created_at', $year . '-12%')->get()->getRow()->views,
                ],
                'subscribers' => [
                    'jan' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-01%')->countAllResults(),
                    'feb' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-02%')->countAllResults(),
                    'mar' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-03%')->countAllResults(),
                    'apr' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-04%')->countAllResults(),
                    'may' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-05%')->countAllResults(),
                    'jun' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-06%')->countAllResults(),
                    'jul' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-07%')->countAllResults(),
                    'aug' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-08%')->countAllResults(),
                    'sep' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-09%')->countAllResults(),
                    'oct' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-10%')->countAllResults(),
                    'nov' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-11%')->countAllResults(),
                    'dec' => $db->table('app_article_subscribe')->where(['user_subscribe_id' => $check->data->id])->like('created_at', $year . '-12%')->countAllResults(),
                ]
            ];
            return $this->respond($data);
        }
        else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
}