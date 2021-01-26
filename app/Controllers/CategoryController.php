<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class CategoryController extends ResourceController
{
    protected $modelName = 'App\Models\CategoryModel';
    protected $format    = 'json';

    public function __construct()
    {
        $this->protect = new AuthController();
    }
    public function index()
    {
        return $this->respond($this->model->findAll());
    }
    public function show($id = null)
    {
        return $this->respond($this->model->get_data($id));
    }
    public function create()
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
            if($check->data->role == 'admin'){
                $request = $this->request->getJSON();
            	$this->model->insert_data([
                    'name' => $request->name,
                    'description' => $request->description,
                    'created_by' => 1,
                    'created_at' => date('Y-m-d H:i:s'),
                    'updated_at' => date('Y-m-d H:i:s')
                ]);
                return $this->respond(['message' => 'Successfuly add data']);
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
            if($check->data->role == 'admin'){
                $request = $this->request->getJSON();
            	$this->model->update_data([
                    'name' => $request->name,
                    'description' => $request->description,
                    'created_by' => 1,
                    'updated_at' => date('Y-m-d H:i:s')
                ], $id);
                return $this->respond(['message' => 'Successfuly update data']);
            }
        }else{
            return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
    public function delete($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
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