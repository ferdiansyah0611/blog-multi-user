<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class ArticleViewerController extends ResourceController
{
    protected $modelName = 'App\Models\ArticleViewerModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
    }
    public function index()
    {
        if($this->request->getGet('article_id')){
            $data = [
                'data' => $this->model->select('app_article_viewer.*, app_user.name, app_user.gender, app_user.avatar')
                ->where('app_article_viewer.article_id', $this->request->getGet('article_id'))
                ->join('app_user', 'app_article_viewer.user_id = app_user.id')
                ->paginate(50),
                'pager' => $this->model->pager->links()
            ];
            return $this->respond($data);
        }
    }
    public function show($id = null)
    {
        return $this->respond($this->model->get_data($id));
    }
    public function create()
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $data = $this->model->where('user_id', $check->data->id)->where('article_id', $this->request->getJSON()->article_id)->get()->getResult();
            if(count($data) === 0){
                $this->model->insert_data([
                    'user_id' => $check->data->id,
                    'article_id' => $this->request->getJSON()->article_id,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
                $db      = \Config\Database::connect();
                $builder = $db->table('app_article');
                $get_views = $builder->where('id', $this->request->getJSON()->article_id)->get()->getRow();
                $builder->where('id', $this->request->getJSON()->article_id)->update(['views' => $get_views->views + 1]);
                return $this->respond(['message' => 'Successfuly add data']);
            }else{
               return $this->respond(['message' => 'Already Access', 'status' => 200], 200); 
            }
        }else{
            return $this->respond(['message' => 'Access Denied', 'status' => 401], 200);
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $this->model->update_data([
                'user_id' => $check->data->id,
                'article_id' => $this->request->getJSON()->article_id,
                'updated_at' => date('Y-m-d H:i:s')
            ], $id);
            return $this->respond(['message' => 'Successfuly update data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function delete($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $this->model->delete_data($id);
            return $this->respond(['message' => 'Successfuly delete data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
}