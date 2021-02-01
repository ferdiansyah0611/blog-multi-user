<?php namespace App\Models;

use CodeIgniter\Model;

class UserUiModel extends Model
{
	protected $table      = 'app_user_ui';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = [
        'user_id', 'navbar-bg', 'navbar-txt', 
        'sidebar-bg', 'sidebar-txt', 'sidebar-cover', 
        'footer-bg', 'footer-status', 'profil-cover'
    ];

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
    public function update_data($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['id' => $id]);
    }
    public function delete_data($id)
    {
        return $this->db->table($this->table)->delete(['id' => $id]);
    }
}