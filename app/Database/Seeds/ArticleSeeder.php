<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ArticleSeeder extends Seeder
{
	public function run()
	{
		for ($i = 0; $i < 100; $i++) {
			$data = [
				'id' => rand(),
				'user_id' => '8624378',
				'category_id' => '56',
				'title' => 'Will an Apple One subscription bundle save you money? We break it down',
				'content' => '
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_E91D7D3D-5FCD-3EFE-BCE0-93AAB97A3F1F">The new Apple One bundles could be a great value for some customers and keep them tethered to Apples services, analysts told CNN Business. It could also be a sign that some of these individual subscriptions didnt draw<strong>&nbsp;</strong>enough consumer attention on their own. Apple has not shared how well services such as Arcade and TV+ have performed.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_275FE1D1-DCA3-395E-084A-97249F610B7A">"Apple is unrelentingly moving forward with its drive towards higher services revenue as part of its overall earnings," said Joost van Dreunen, founder of video game investment firm New Breukelen. "Apples individual subscriptions werent performing as well as Apple had planned... Apple would rather just bundle all of it."</div>
					<div class="el__embedded el__embedded--fullwidth">
					<div class="el__image--fullwidth js__image--fullwidth">
					<div><div class="material-placeholder">
						<img class="media__image media__image--responsive" src="https://cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-exlarge-169.jpg" alt="Apple One" data-src-mini="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-small-169.jpg" data-src-xsmall="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-medium-plus-169.jpg" data-src-small="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-large-169.jpg" data-src-medium="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-exlarge-169.jpg" data-src-large="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-super-169.jpg" data-src-full16x9="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-full-169.jpg" data-src-mini1x1="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-small-11.jpg" data-demand-load="loaded" data-eq-pts="mini: 0, xsmall: 221, small: 308, medium: 461, large: 781" data-eq-state="mini xsmall small medium" data-src="//cdn.cnn.com/cnnnext/dam/assets/200915133931-15-apple-event-0915---screenshot-exlarge-169.jpg"></div>
					<div class="media__caption el__gallery_image-title">
					<div class="element-raw appearance-fullwidth">Apple One</div>
					</div>
					</div>
					</div>
					</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_4A0C49A7-168D-3327-45A3-93C1B4D0F64C">The subscription service comes in three tiers. The cost of an Individual plan is $14.95, which gets you Apple Music, Apple Arcade, Apple TV+ and 50GB of iCloud storage. A family plan goes for $19.95, which allows those services to be shared with up to six family members and gets you 200GB of storage. Finally, the Premier tier for $29.95 a month includes all those services plus News and Fitness (more on this below) subscriptions. It also bumps up the storage to 2TB. (Prices vary internationally.)</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_8FF14EE4-87A9-D66E-4FB3-93AB280AB3FF">Lets break down how much consumers save.</div>
					<div class="zn-body__read-all">
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_BC5A2560-ABB2-B9CA-2D6D-93ABCB1F4091">In the US, Apple Music costs $4.99 per month for students, $9.99 for individuals and $14.99 for families.&nbsp;<a href="https://www.cnn.com/2019/09/16/tech/apple-arcade-mobile-gaming-overland-shinsekai/index.html" target="_blank" rel="noopener">Apple Arcade is 4.99</a>&nbsp;a month and can be shared among family members. Apple TV+ is $4.99 a month. It can be shared among a family. Cloud storage of 50GB costs $0.99, while 200GB costs $2.99 and 2TB goes for $9.99.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_04BBC9AC-2A07-4D59-B9BE-93B3990FF669">News+ costs $9.99 a month, as does Apples new Fitness+ subscription for workout classes.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_F9D87F09-76A8-77AD-DDC0-93AF72D3BD10">Put that all together, and the individual tier of Apple One services is valued at approximately $21, saving a user around $6 when paying for the bundle. The family tier is valued at around $28, saving you $8 with Apple One.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_366C4F3F-A8EB-0EB1-662C-93B36D7D526A">Finally, with the most expensive Apple One bundle, youre getting about $55 worth of Apple services, for a savings of $25.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_38DCDEA4-4D13-525F-3E1B-93ADED1B8B55">Apple is offering the new service on a 30-day free trial for any services that customers do not already have. For example, if you have Apple Music but not Apple TV+ or Apple Arcade then you get a trial of the other two when you switch to Apple One.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_42108208-5E8B-E4B5-7F31-93E4B4840CF7">Of course theres only value if a person wants and uses all these services, ultimately renewing year after year. A number of them are new enough that theyll need a lot more content to prove their worth.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_47F9B51E-46B3-DF8C-D35C-93A89B5A6D65">Brad Gastwirth, chief technology strategist at Wedbush Securities, said that, of Apples many subscriptions, TV+ is one that will benefit from being included in a bundle with some of the tech giant popular services, like Apple Music. The year-old Apple Arcade service could as well.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_49284F37-68B4-8747-0A83-93BD3337C8B5">"TV still up in the air on how that will perform in the future. Theres certainly an opportunity but thats one that they want to convert," he said. "Its unclear at this juncture if [Apple Arcade] will really be a major success or not. The casual gamer has certain apps they use and the hardcore gamer has different platforms."</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_1F9502AB-A57A-D154-D4D8-93BFA8D53407">Analysts are bullish on the bundling<strong>&nbsp;</strong>approach and suggest it could be highly effective and simplify Apples various offerings.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_625017DB-63F5-A8BC-065D-93BFA9EC2736">"It will be much easier for Apple to grow the user bases of Apple Arcade, TV+, News+, and Fitness+ through bundling as opposed to the costs involved in convincing a single user to subscribe to each of those services individually," Alex Malafeev, CEO of analytics firm Sensor Tower, told CNN Business.</div>
					<div class="zn-body__paragraph" data-paragraph-id="paragraph_65D37495-02CC-346B-ACA1-93BFD41529CE">Van Dreunen, the investment firm founder, was more ambivalent. "Do I need Apple News? No. Will I occasionally look at it if its part of a bundle? Maybe," he said. "Will it prevent me from subscribing to, say, another news service? Probably."</div>
					</div>
				',
				'description' => "Apple's newly announced subscription bundles are the company's latest effort to push its music, streaming video, gaming and other services on u",
				'image' => '191115091836-apple-music-2019---stock-exlarge-169.jpg',
				'status' => 'public',
				'views' => '0',
				'created_at' => date('Y-m-d H:i:s'),
				'updated_at' => date('Y-m-d H:i:s')
			];
			$this->db->table('app_article')->insert($data);
		}
	}
}
