<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class ArticleFavoriteController extends ResourceController
{
    protected $modelName = 'App\Models\ArticleFavoriteModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
    }

    public function index()
    {
        if($this->request->getGet('paginate')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
                $data = [
                    'data' => $this->model->select('app_article_favorite.id as favorite_id, app_article.*, app_user.name, app_user.avatar')
                        ->join('app_article', 'app_article_favorite.article_id = app_article.id')
                        ->join('app_user', 'app_article.user_id = app_user.id')
                        ->where('app_article_favorite.user_id', $check->data->id)->paginate(20),
                    'pager' => $this->model->pager->links()
                ];
                return $this->respond($data);
            }else{
                return $this->respond(['message' => 'Access Denied'], 401);
            }
        }
        if($this->request->getGet('total')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
                $db = \Config\Database::connect();
                $build = ['total' => $db->table('app_article_favorite')->where('user_id', $check->data->id)->countAllResults()];
                return $this->respond($build);
            }
        }
        if($this->request->getGet('article_id')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
                if($this->request->getGet('unfavorite')){
                    $this->model->where('article_id', $this->request->getGet('article_id'))->where('user_id', $check->data->id)->delete();
                    return $this->respond(['message' => 'Successfuly Unfavorite Articles'], 200);
                }else{
                    $data = $this->model->where('article_id', $this->request->getGet('article_id'))->where('user_id', $check->data->id)->get()->getRow();
                    if(!empty($data)){
                        return $this->respond($data);
                    }else{
                        return $this->respond(['status' => 200], 200);
                    }
                }
            }else{
                return $this->respond(['message' => 'Access Denied', 'status' => 401], 200);
            }
        }else{
            return $this->respond(['status' => 200], 200);
        }
    }
    public function show($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
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
                return $this->respond(['message' => 'Added to favorite']);
            }else{
                $this->model->where(['article_id' => $this->request->getJSON()->article_id, 'user_id' => $check->data->id])->delete();
                return $this->respond(['message' => 'Removed from favorite']);
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
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
            $this->model->where(['id' => $id, 'user_id' => $check->data->id])->delete();
            return $this->respond(['message' => 'Successfuly delete data']);
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
}