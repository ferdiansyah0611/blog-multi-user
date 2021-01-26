<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class FileController extends ResourceController
{
	public function __construct()
    {
        $this->protect = new AuthController();
    }
	public function index($user = null, $imageName = null)
	{
		$path = WRITEPATH.'uploads/'.$user.'/'.$imageName;
		if(($image = file_get_contents($path)) === FALSE)
		{
			return $this->respond(['message' => 'Failed Load File'], 400);
		}else{
			if($this->request->getGet('download')){
				$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
				if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
					if($check->data->id === $user){
						return $this->response->download($path, null);
					}else{
						return $this->respond(['message' => 'Failed Download File'], 401);
					}
				}else{
					return $this->respond(['message' => 'Failed Download File'], 401);
				}
			}
			if($this->request->getGet('delete')){
				$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
				if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
					if($check->data->id === $user){
						unlink($path);
						return $this->respond(['message' => 'Successfuly Delete File'], 200);
					}else{
						return $this->respond(['message' => 'Failed Delete File'], 401);
					}
				}else{
					return $this->respond(['message' => 'Failed Delete File'], 401);
				}
			}
			else{
				$mimeType = 'image/jpg';
				$file = new \CodeIgniter\Files\File($path);
				$this->response
					->setStatusCode(200)
					->setContentType($file->getMimeType())
					->setBody($image)
					->send();

			}
		}
	}
	public function upload()
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
		if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
			if($this->request->getFile('file_upload')){
				$file = $this->request->getFile('file_upload');
				$file->move(WRITEPATH.'uploads/'. $check->data->id);
				return $this->respond(['message' => "Successfuly Upload File"], 200);
			}
		}else{
			return $this->respond(['message' => 'Failed Upload File Because Access Denied'], 401);
		}
	}
	public function storage()
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
		if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
			helper('filesystem');
			$map = directory_map(WRITEPATH.'uploads/'.$check->data->id);
			return $this->respond(['data' => $map], 200);
		}else{
			return $this->respond(['message' => 'Access Denied'], 401);
		}
	}
	public function usage()
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
		if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
			helper('filesystem');
			$datafiles = get_filenames(WRITEPATH.'uploads/8624378');
			$count = 0;
			$files = [];
			foreach($datafiles as $data){
				$file = new \CodeIgniter\Files\File(WRITEPATH.'uploads/8624378/'.$data);
				$count = $count + $file->getSize('mb');
			}
			/*
				1 = 1000000b / 1000kb
			*/
			$files['usage'] = round(1000000 / 1024 / 1024);
			if($check->data->type == 0){
				$files['remain'] = intval(50) - $files['usage'];
			}
			if($check->data->type == 1){
				$files['remain'] = intval(100000000) - $files['usage'];
			}
			if($check->data->type == 2){
				$files['remain'] = intval(500000000) - $files['usage'];
			}
			if($check->data->type == 3){
				$files['remain'] = intval(1000000000) - $files['usage'];
			}
			if($check->data->type == 4){
				$files['remain'] = intval(2000000000) - $files['usage'];
			}
			if($check->data->type == 5){
				$files['remain'] = 10000;
			}
			return $this->respond($files, 200);
		}else{
			return $this->respond(['message' => 'Access Denied'], 401);
		}
	}
}