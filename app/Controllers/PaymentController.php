<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use App\Controllers\AuthController;

require_once APPPATH . 'ThirdParty/Midtrans/Midtrans.php';

\Midtrans\Config::$serverKey = 'SB-Mid-server-rvSjxE1VujIDkQSJilHOrCa9';
\Midtrans\Config::$isProduction = false;
\Midtrans\Config::$isSanitized = true;
\Midtrans\Config::$is3ds = true;

class PaymentController extends ResourceController
{
	protected $modelName = 'App\Models\UserPaymentModel';
    protected $format    = 'json';

	public function __construct()
    {
        $this->protect = new AuthController();
    }
    public function index()
    {
    	$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted'){
	    	$data = $this->request->getJSON(true);
	    	$this->model->insert_data([
	    		'user_id' => $check->data->id,
	    		'order_id' => $data['order_id'],
	    		'created_at' => date('Y-m-d H:i:s'),
                'updated_at' => date('Y-m-d H:i:s')
	    	]);
	    	return $this->respond([ 'message' => $data['status_message']]);
        }
    }
    public function status($orderid = null)
    {
    	$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
			return $this->respond(\Midtrans\Transaction::status($orderid));
        }
    }
    public function approve($orderid = null)
    {
    	$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
        	if($check->data->role === 'admin')
        	{
				return $this->respond(\Midtrans\Transaction::approve($orderid));
        	}
        }
    }
    public function cancel($orderid = null)
    {
    	$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
        	if($check->data->role === 'admin')
        	{
				return $this->respond(\Midtrans\Transaction::cancel($orderid));
        	}
        }
    }
    public function expire($orderid = null)
    {
    	$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
        	if($check->data->role === 'admin')
        	{
				return $this->respond(\Midtrans\Transaction::expire($orderid));
        	}
        }
    }
	public function pay()
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
			if($this->request->getGet('type'))
			{
				$price = 1000;
				$item_details = array();
				if($this->request->getGet('type') == '1'){
					$price = 1000;
					$item_details = array (
					    array(
					      'id' => 'a1',
					      'price' => $price,
					      'quantity' => 1,
					      'name' => "Packet Normal"
					    ),
					);
				}
				if($this->request->getGet('type') == '2'){
					$price = 156000;
					$item_details = array (
					    array(
					      'id' => 'a2',
					      'price' => $price,
					      'quantity' => 1,
					      'name' => "Packet Personal"
					    ),
					);
				}
				if($this->request->getGet('type') == '3'){
					$price = 200000;
					$item_details = array (
					    array(
					      'id' => 'a3',
					      'price' => $price,
					      'quantity' => 1,
					      'name' => "Packet Blogger"
					    ),
					);
				}
				if($this->request->getGet('type') == '4'){
					$price = 300000;
					$item_details = array (
					    array(
					      'id' => 'a4',
					      'price' => $price,
					      'quantity' => 1,
					      'name' => "Packet Bussiness"
					    ),
					);
				}
				$transaction_details = array(
				  'order_id' => rand(),
				  'gross_amount' => $price,
				);
				$customer_details = array(
				  'first_name'    => $check->data->name,
				  'email'         => $check->data->email,
				);
				$transaction = array(
				  'transaction_details' => $transaction_details,
				  'customer_details' => $customer_details,
				  'item_details' => $item_details,
				);
				$snapToken = \Midtrans\Snap::getSnapToken($transaction);
				return $this->respond(['token' => $snapToken]);
			}
			if($this->request->getGet('paginate'))
			{
				$data = [
					'data' => $this->model->where('user_id', $check->data->id)->paginate(25)
				];
				return $this->respond($data);
			}
        }else{
        	return $this->respond(['message' => 'Access Denied'], 401);
        }
	}
	public function check($orderid = null)
	{
		$check = $this->protect->check($this->request->getServer('HTTP_AUTHORIZATION'));
        if(!empty($check->{'message'}) && $check->message == 'Access Granted')
        {
        	$status = \Midtrans\Transaction::status($orderid);
        	if($status->transaction_status == 'capture')
        	{
				$db = \Config\Database::connect();
				$premium = $db->table('app_user_premium');
				$hasOrderId = $premium->where('order_id', $orderid)->get()->getResultArray();
				if(empty($hasOrderId))
				{
					$type = 1;
					$expired_at = strtotime("+30 days");
					if($status->gross_amount === '49000.00')
					{
						$type = 1;
						$expired_at = strtotime("+30 days");
					}
					if($status->gross_amount === '156000.00')
					{
						$type = 2;
						$expired_at = strtotime("+90 days");
					}
					if($status->gross_amount === '200000.00')
					{
						$type = 3;
						$expired_at = strtotime("+180 days");
					}
					if($status->gross_amount === '300000.00')
					{
						$type = 4;
						$expired_at = strtotime("+365 days");
					}
					$db->table('app_user')->where('id', $check->data->id)->update(['role' => 'premium', 'type' => $type]);
					$premium->insert([
						'user_id' => $check->data->id,
						'order_id' => $orderid,
						'expired_at' => date('Y-m-d', $expired_at),
						'created_at' => date('Y-m-d H:i:s'),
                		'updated_at' => date('Y-m-d H:i:s')
					]);
					return $this->respond(['message' => 'Successfully Upgrade Account', 'status' => 200]);
				}
				else{
        			return $this->respond(['message' => 'Sorry this payment has been accepted', 'status' => 400], 200);
        		}
        	}
        	if($status->transaction_status === 'pending')
        	{
        		return $this->respond(['message' => 'Transaction is created and available/waiting to be paid by customer at the payment provider.', 'status' => 400]);
        	}
        	if($status->transaction_status === 'settlement')
        	{
        		return $this->respond(['message' => '	Transaction is successfully settled. Funds have been received.', 'status' => 400]);
        	}
        	if($status->transaction_status === 'deny')
        	{
        		return $this->respond(['message' => 'The credentials used for payment are rejected by the payment provider', 'status' => 400]);
        	}
        	if($status->transaction_status === 'cancel')
        	{
        		return $this->respond(['message' => 'Transaction is cancelled.', 'status' => 400]);
        	}
        	if($status->transaction_status === 'expire')
        	{
        		return $this->respond(['message' => 'Transaction no longer available to be paid or processed, because the payment is not completed within the expiry time period.', 'status' => 400]);
        	}
        }
        else{
        	return $this->respond(['message' => 'Access Denied'], 401);
        }
	}
}