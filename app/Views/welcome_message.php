<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- title -->
		<title>Go Blog</title>
		<!-- meta -->
		<meta charset="UTF-8">
		<meta name="description" content="The small framework with powerful features">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<?= csrf_meta() ?>
		<!-- favicon -->
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">
		<!-- icons -->
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<!-- fonts -->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
		<!-- stylesheet -->
	    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.7.2/dropzone.min.css" integrity="sha512-3g+prZHHfmnvE1HBLwUnVuunaPOob7dpksI7/v6UnF/rnKGwHf/GdEq9K7iEN7qTtW+S0iivTcGpeTBqqB04wA==" crossorigin="anonymous" />
	</head>
	<body>
		<div id="app"></div>
		<!-- javascript -->
	    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/tinymce@5.6.2/tinymce.min.js" integrity="sha256-OCSy/uzE9FIq9cG6r4RoFpK37HGlr65sxjrfIS30dVE=" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.7.2/min/dropzone.min.js" integrity="sha512-9WciDs0XP20sojTJ9E7mChDXy6pcO0qHpwbEJID1YVavz2H6QBz5eLoDD8lseZOb2yGT8xDNIV7HIe1ZbuiDWg==" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
		<script type="text/javascript" src="https://app.sandbox.midtrans.com/snap/snap.js" data-client-key="SB-Mid-client-GDAAzSWuVh-Fi1Zh"></script>
		<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
		<script src="<?= getenv('CI_ENVIRONMENT') == 'development' ? base_url('js/app.js') : base_url('js/app.production.js') ?>" defer=""></script>
	</body>
</html>