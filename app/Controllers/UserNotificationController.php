<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

class UserNotificationController extends ResourceController
{
	protected $modelName = 'App\Models\UserNotificationModel';
    protected $format    = 'json';

	public function __construct()
    {
        $this->protect = new AuthController();
    }
	public function index()
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            if($this->request->getGet('read') == 'all')
            {
                $this->model->update_data(['status' => 'read'],['user_id' => $check->data->id]);
                return $this->respond(['message' => 'Successfuly read all data']);
            }
            if($this->request->getGet('clear') == 'all')
            {
                $this->model->where(['user_id' => $check->data->id])->delete();
                return $this->respond(['message' => 'Successfuly clear data']);
            }
            else
            {
                $data = ['data' => $this->model->where('user_id', $check->data->id)->paginate(25)];
                return $this->respond($data);
            }
        }else{
        	return $this->respond(['message' => 'Access Denied'], 401);
        }
	}
	public function show($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
        	return $this->respond($this->model->get_data($id));
        }else{
        	return $this->respond(['message' => 'Access Denied'], 401);
        }
    }
	public function create($user_id = null, $name = null, $type = null)
    {
        $db = \Config\Database::connect()->table('app_user_notification');
        if($this->request && $this->request->getPost('message'))
        {
            $db->insert([
                'user_id' => $check->data->id,
                'message' => $this->request->getPost('message'),
                'type' => $this->request->getPost('type'),
                'status' => 'unread',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            return $this->respond(['message' => 'Successfuly add data']);
        }else{
            $message = "";
            if($type === 'subscribe')
            {
                $message = $name . ' has subscribed to your account';
            }
            if($type === 'commented')
            {
                $message = $name . ' has commented on your article';
            }
            if($type === 'unsubscribe')
            {
                $message = $name . ' has not subscribed to your account';
            }
            $db->insert([
                'user_id' => $user_id,
                'message' => $message,
                'type' => $type,
                'status' => 'unread',
                'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
            ]);
            return true;
        }
    }
    public function update($id = null)
    {
        $check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
            $this->model->update_data([
                'status' => 'read',
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