<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class UserReportController extends ResourceController
{
    protected $modelName = 'App\Models\UserReportModel';
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
                    'data' => $this->model->select('app_article_subscribe.id as favorite_id, app_article.*, app_user.name, app_user.avatar')
                        ->join('app_article', 'app_article_subscribe.article_id = app_article.id')
                        ->join('app_user', 'app_article.user_id = app_user.id')
                        ->where('app_article_subscribe.user_id', $check->data->id)->paginate(20),
                    'pager' => $this->model->pager->links()
                ];
                return $this->respond($data);
            }else{
                return $this->respond(['message' => 'Access Denied'], 401);
            }
        }
        if($this->request->getGet('user_report_id')){
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
                $data = $this->model->where('user_report_id', $this->request->getGet('user_report_id'))->where('user_id', $check->data->id)->get()->getRow();
                if($data)
                {
                    return $this->respond($data);
                }
                else{
                    return $this->respond([]);
                }
            }else{
                return $this->respond(['message' => 'Access Denied'], 200);
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
            $data = $this->model->where('user_id', $check->data->id)->where('user_report_id', $this->request->getJSON()->user_report_id)->get()->getResult();
            if(count($data) === 0){
                $this->model->insert_data([
                    'user_id' => $check->data->id,
                    'user_report_id' => $this->request->getJSON()->user_report_id,
                    'category' => $this->request->getJSON()->category,
                    'description' => $this->request->getJSON()->description,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
                return $this->respond(['message' => 'Successfuly add data']);
            }else{
                return $this->respond(['message' => 'Bad Request'], 400);
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
                'user_report_id' => $this->request->getJSON()->user_report_id,
                'category' => $this->request->getJSON()->category,
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