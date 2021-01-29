<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class CommentController extends ResourceController
{
    protected $modelName = 'App\Models\CommentModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
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
        }else{
            $data = [
                'data' => $this->model->select('app_comment.*, app_user.name, app_user.avatar')
                ->join('app_user', 'app_comment.user_id = app_user.id')->orderBy('app_comment.created_at', 'DESC')->paginate(20),
                'pager' => $this->model->pager->links()
            ];
            return $this->respond($data);
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
                'article_id' => 'required|min_length[3]|max_length[50]',
                'comment' => 'required|min_length[5]|max_length[5000]',
            ]);
            if($validation->withRequest($this->request)->run() === true)
            {
                $request = $this->request->getJSON();
                $this->model->insert_data([
                    'user_id' => $check->data->id,
                    'article_id' => $request->article_id,
                    'comment' => $request->comment,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
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
                    'article_id' => 'required|min_length[3]|max_length[50]',
                    'comment' => 'required|min_length[5]|max_length[5000]',
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
        return $this->respond($this->model->search_data($this->request->getGet('q')));
    }
}