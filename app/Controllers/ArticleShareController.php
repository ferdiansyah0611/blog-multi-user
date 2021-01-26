<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class ArticleShareController extends ResourceController
{
    protected $modelName = 'App\Models\ArticleShareModel';
    protected $format    = 'json';

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
    	$this->model->insert_data([]);
    }
    public function update($id = null)
    {
    	$this->model->update_data([], $id);
    }
    public function delete($id = null)
    {
    	$this->model->delete_data($id);
    }
}