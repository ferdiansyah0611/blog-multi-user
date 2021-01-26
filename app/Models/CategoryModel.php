<?php namespace App\Models;

use CodeIgniter\Model;

class CategoryModel extends Model
{
	protected $table      = 'app_category';
    protected $primaryKey = 'id';

    protected $returnType     = 'array';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['name', 'description', 'created_by'];

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
        return $this->db->table($this->table)->insert($data);
    }
    public function update_data($data, $id)
    {
        return $this->db->table($this->table)->update($data, ['id' => $id]);
    }
    public function delete_data($id)
    {
        return $this->db->table($this->table)->delete(['id' => $id]);
    }
    public function search_data($data)
    {
        return $this->db->table($this->table)->like($this->allowedFields[0], $data)
        ->orLike([$this->allowedFields[1] => $data,
            $this->allowedFields[2] => $data])->get()->getResultArray();
    }
}