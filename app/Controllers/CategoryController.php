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
        if($this->request->getGet('paginate'))
        {
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
                if($this->request->getGet('order_by') && $this->request->getGet('order_status'))
                {
                    $order_status = 'ASC';
                    $this->request->getGet('order_status') == 'true' ? $order_status = 'DESC': false;
                    $data = [
                        'data' => $this->model->orderBy($this->request->getGet('order_by'), $order_status)->paginate(100)
                    ];
                    return $this->respond($data);
                }
            }
        }
        if($this->request->getGet('name')){
            return $this->respond($this->model->where('name', $this->request->getGet('name'))->get()->getRow());
        }else{
            $cache = \Config\Services::cache();
            if (!$cache->get('category'))
            {
                $data = $this->model->findAll();
                cache()->save('category', $data, 600);
                return $this->respond($data);
            }
            else{    
                return $this->respond($cache->get('category'));
            }
        }
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
                $validation =  \Config\Services::validation();
                $validation->setRules([
                    'name' => 'required|min_length[3]|max_length[50]|is_unique[app_category.name]',
                    'description' => 'required|min_length[5]|max_length[255]',
                ]);
                if($validation->withRequest($this->request)->run() === true)
                {
                    $request = $this->request->getJSON();
                	$this->model->insert_data([
                        'name' => $request->name,
                        'description' => $request->description,
                        'created_by' => $check->data->id,
                        'created_at' => date('Y-m-d H:i:s'),
                        'updated_at' => date('Y-m-d H:i:s')
                    ]);
                    return $this->respond(['message' => 'Successfuly add data']);
                }else{
                    return $this->respond(['message' => $validation->listErrors()], 403);
                }
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
                $validation =  \Config\Services::validation();
                $validation->setRules([
                    'name' => 'required|min_length[3]|max_length[50]',
                    'description' => 'required|min_length[5]|max_length[255]',
                ]);
                if($validation->withRequest($this->request)->run() === true)
                {
                    $request = $this->request->getJSON();
                	$this->model->update_data([
                        'name' => $request->name,
                        'description' => $request->description,
                        'created_by' => $check->data->id,
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
        if($this->request->getGet('order_by') && $this->request->getGet('order_status'))
        {
            $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
            if(!empty($check->{'message'}) && $check->{'message'} == 'Access Granted'){
                $order_status = 'ASC';
                $this->request->getGet('order_status') == 'true' ? $order_status = 'DESC': false;
                $data = [
                    'data' => $this->model->like('name', $this->request->getGet('q'))->orderBy($this->request->getGet('order_by'), $order_status)->paginate(100)
                ];
                return $this->respond($data);
            }
        }
        else{
            return $this->respond($this->model->search_data($this->request->getGet('q')));
        }
    }
}