<?php namespace App\Models;

use CodeIgniter\Model;

class UserNotificationModel extends Model
{
	protected $table      = 'app_user_notification';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['user_id', 'message', 'type', 'status'];

    protected $useTimestamps = false;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';

    protected $validationRules    = [];
    protected $validationMessages = [];
    protected $skipValidation     = false;

    public function get_data($id = false)
    {
        if($id === false){
            return $this->table($this->table)
                ->get()
                ->getResultArray();
        } else {
            return $this->table($this->table)
                ->where('id', $id)
                ->get()
                ->getRowArray();
        }   
    }
    public function insert_data($data)
    {
        $this->db->table($this->table)->insert($data);
        return true;
    }
    public function update_data($data, $where)
    {
        return $this->db->table($this->table)->update($data, $where);
    }
    public function delete_data($id)
    {
        return $this->db->table($this->table)->delete(['id' => $id]);
    }
}