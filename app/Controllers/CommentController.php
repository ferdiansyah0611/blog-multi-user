<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\UserNotificationController;

class CommentController extends ResourceController
{
    protected $modelName = 'App\Models\CommentModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
        $this->notification = new UserNotificationController();
    }

    public function index()
    {
        if($this->request->getGet('total')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $db = \Config\Database::connect();
                $build = ['total' => $db->table('app_comment')->where('user_id', $check->data->id)->countAllResults()];
                return $this->respond($build);
            }
        }
        if($this->request->getGet('paginate')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                if($this->request->getGet('order_by') && $this->request->getGet('order_status'))
                {
                    $order_status = 'ASC';
                    $data = [
                        'data' => $this->model->select('app_comment.*, app_user.name, app_user.avatar')
                        ->join('app_user', 'app_comment.user_id = app_user.id')->orderBy('app_comment.'.$this->request->getGet('order_by'), $order_status)
                        ->where('user_id', $check->data->id)->paginate(20),
                    ];
                    return $this->respond($data);
                }
            }
        }
    }
    public function show($id = null)
    {
        $data = [
            'data' => $this->model->select('app_comment.*, app_user.name, app_user.avatar')
            ->join('app_user', 'app_comment.user_id = app_user.id')->where('app_comment.article_id', $id)->orderBy('app_comment.created_at', 'DESC')->paginate(20),
            'pager' => $this->model->pager->links()
        ];
        return $this->respond($data);
    }
    public function create()
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $validation =  \Config\Services::validation();
            $validation->setRules([
                'article_id' => 'required',
                'comment' => 'required|min_length[5]|max_length[5000]',
            ]);
            if($validation->withRequest($this->request)->run() === true)
            {
                $request = $this->request->getJSON();
                $db = \Config\Database::connect();
                $this->model->insert_data([
                    'user_id' => $check->data->id,
                    'article_id' => $request->article_id,
                    'comment' => $request->comment,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
                $user_id = $db->table('app_article')->where('id', $request->article_id)->get()->getRow()->user_id;
                if($user_id !== $check->data->id)
                {
                    $this->notification->create($user_id, $check->data->name, 'commented');
                }
                return $this->respond(['message' => 'Successfuly add data']);
            }else{
                return $this->respond(['message' => $validation->listErrors()], 403);
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            if($check->data->role == 'admin'){
                $validation =  \Config\Services::validation();
                $validation->setRules([
                    'article_id' => 'required',
                    'comment' => 'required|string|min_length[1]|max_length[5000]',
                ]);
                if($validation->withRequest($this->request)->run() === true)
                {
                    $request = $this->request->getJSON();
                    $this->model->update_data([
                        'user_id' => $check->data->id,
                        'article_id' => $request->article_id,
                        'comment' => $request->comment,
                        'updated_at' => date('Y-m-d H:i:s')
                    ], $id);
                    return $this->respond(['message' => 'Successfuly update data']);
                }else{
                    return $this->respond(['message' => $validation->listErrors()], 403);
                }
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function delete($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            if($check->data->role == 'admin'){
                $this->model->delete_data($id);
                return $this->respond(['message' => 'Successfuly delete data']);
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function search()
    {
        if($this->request->getGet('order_by') && $this->request->getGet('order_status'))
        {
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $this->request->getGet('order_status') == 'true' ? $order_status = 'DESC': false;
                $data = [
                    'data' => $this->model->like('comment', $this->request->getGet('q'))->orLike('article_id', $this->request->getGet('q'))->orderBy($this->request->getGet('order_by'), $order_status)->paginate(25)
                ];
                return $this->respond($data);
            }
        }
    }
}