// 365 jokes: 183 English puns + 182 Chinese 谐音梗, one per day, taking turns.
// Each line is "question | punchline".

const EN = `
Why did the cat sit on the computer? | To keep an eye on the mouse.
What do you call a pile of kittens? | A meowntain.
Why don't eggs tell jokes? | They'd crack each other up.
What do you call a fake noodle? | An impasta.
Why did the scarecrow win an award? | He was outstanding in his field.
What do you call cheese that isn't yours? | Nacho cheese.
Why can't a bicycle stand up by itself? | It's two tired.
What do you call a bear with no teeth? | A gummy bear.
What did the ocean say to the beach? | Nothing, it just waved.
Why did the cookie go to the doctor? | It felt crummy.
What do you call a sleeping dinosaur? | A dino-snore.
Why did the banana go to the doctor? | It wasn't peeling well.
What do you call a cow with no legs? | Ground beef.
What do you call a dog magician? | A labracadabrador.
Why are frogs so happy? | They eat whatever bugs them.
What did one wall say to the other wall? | I'll meet you at the corner.
What do you call a fish wearing a bowtie? | Sofishticated.
What do you call an alligator in a vest? | An investigator.
Why did the golfer bring two pairs of pants? | In case he got a hole in one.
What do you call a belt made of watches? | A waist of time.
What kind of tree fits in your hand? | A palm tree.
Why did the tomato blush? | It saw the salad dressing.
What do you call a lazy kangaroo? | A pouch potato.
How does a penguin build its house? | Igloos it together.
What do you call a cat that loves bowling? | An alley cat.
Why did the math book look so sad? | It had too many problems.
What do you call a snowman with a six-pack? | An abdominal snowman.
What did the grape do when it got stepped on? | It let out a little wine.
Why do cows wear bells? | Because their horns don't work.
What do you call a pig that does karate? | A pork chop.
What do you call a duck that gets all A's? | A wise quacker.
What's a cat's favourite colour? | Purr-ple.
What do kittens wear to bed? | Paw-jamas.
What do you call a cat that always gets what it wants? | Purr-suasive.
Why was the cat afraid of the tree? | Because of its bark.
How do cats end a fight? | They hiss and make up.
What's a cat's favourite magazine? | Good Mousekeeping.
What do you call a kitten that sneezes? | A cat-choo!
Why did the cat join the Red Cross? | She wanted to be a first-aid kit.
What do cats eat for breakfast? | Mice Krispies.
What's a cat's favourite dessert? | Chocolate mouse.
Why don't cats play poker in the jungle? | Too many cheetahs.
What do you call a cat with eight legs that loves to swim? | An octopuss.
What's a cat's favourite TV show? | The evening mews.
What do you call a cat that eats lemons? | A sour puss.
Why did the calendar feel so popular? | It had a lot of dates.
Why are calendars always stressed? | Their days are numbered.
What did the hot water bottle say to the cramp? | Warm regards, now go away.
Why did the chocolate bar go to therapy? | It was feeling a bit broken.
Why did the moon skip dinner? | It was already full.
What does a cloud wear under its raincoat? | Thunderwear.
Why did the sun go to school? | To get a little brighter.
What do you call a dinosaur with a huge vocabulary? | A thesaurus.
What did the zero say to the eight? | Nice belt!
Why did the coffee file a police report? | It got mugged.
How do you organise a space party? | You planet.
What do you call a boomerang that won't come back? | A very lonely stick.
What did the janitor shout when he jumped out of the closet? | Supplies!
Why did the stadium get so hot? | All the fans left.
What do you call a can opener that doesn't work? | A can't opener.
What do you call a pony with a sore throat? | A little horse.
Why don't skeletons fight each other? | They don't have the guts.
What do lawyers wear to court? | Lawsuits.
Why did the bee get married? | He found his honey.
What do you call a bee that can't make up its mind? | A maybe.
What do you call a train carrying bubblegum? | A chew-chew train.
What do you call an owl that does magic? | Hoo-dini.
Why did the chicken join a band? | It already had the drumsticks.
What do you call a sad strawberry? | A blueberry.
What did the pancake say to the butter? | You're on top of everything.
What do you call a potato wearing glasses? | A spec-tater.
Why did the orange stop rolling? | It ran out of juice.
What do you call a peanut in a spacesuit? | An astronut.
Why did the burger go to the gym? | To get better buns.
What do you call cheese that's feeling down? | Blue cheese.
What did the lettuce say to the celery? | Quit stalking me!
Why did the egg hide? | It was a little chicken.
What do you call a sheep with no legs? | A cloud.
What do you call a dog that can tell the time? | A watch dog.
Why don't oysters share their pearls? | They're shellfish.
What did the left eye say to the right eye? | Between us, something smells.
What do you call a fly without wings? | A walk.
Why did the music teacher need a ladder? | To reach the high notes.
What do you call a dinosaur that crashes cars? | Tyrannosaurus wrecks.
Why did the picture go to jail? | It was framed.
What do you call a bear in the rain? | A drizzly bear.
Why was the broom late? | It over-swept.
What did the big flower say to the little flower? | Hey there, bud!
What's orange and sounds like a parrot? | A carrot.
What do you call a deer with no eyes? | No idea. (No-eye deer!)
What do you call a deer with no eyes and no legs? | Still no idea.
Why did the cow go to outer space? | To see the moooon.
What do you call a monkey that loves potato chips? | A chipmunk.
Why did the computer go to the doctor? | It caught a virus.
Why was the computer cold? | It left its Windows open.
What do you call a sleeping bull? | A bulldozer.
Why did the student eat his homework? | The teacher said it was a piece of cake.
How do you make a tissue dance? | Put a little boogie in it.
What do you call a dog that does science? | A lab.
What do you call a cat that loves books? | Litter-ary.
Why did the pig become an actor? | He was a big ham.
What do elves learn in school? | The elf-abet.
Why did the man put his money in the freezer? | He wanted cold, hard cash.
What do sea monsters eat for dinner? | Fish and ships.
What does a house wear to a party? | Ad-dress.
Why did the kid bring a ladder to school? | To go to high school.
What did the sushi say to the bee? | Wasa-bee!
What kind of shoes do ninjas wear? | Sneakers.
Why can't you trust an atom? | They make up everything.
What do you call a man with a rubber toe? | Roberto.
What did the traffic light say to the car? | Don't look, I'm changing!
Why did the drum take a nap? | It was beat.
What's brown and sticky? | A stick.
What do you call a factory that makes okay products? | A satisfactory.
What did one hat say to the other hat? | You stay here, I'll go on a head.
Why don't scientists trust stairs? | They're always up to something.
What do you call a group of musical whales? | An orca-stra.
Why are fish so smart? | They live in schools.
What do you call a shoe made from a banana? | A slipper.
Why did the cat wear a fancy dress? | She was feline fine.
How do you fix a cracked pumpkin? | With a pumpkin patch.
What do you call a funny mountain? | Hill-arious.
What do you call a bird that's afraid to fly? | Chicken.
What did the baby corn say to the mama corn? | Where's pop-corn?
Why did the soccer player bring string to the game? | So she could tie the score.
What do you call the horse that lives next door? | Your neigh-bour.
What do you call a pig in handcuffs? | Ham-cuffed.
Why did the gym close down? | It just didn't work out.
What did the paper say to the pencil? | Write on!
What do you call a hen who counts her eggs? | A mathemachicken.
Why was the belt arrested? | It held up a pair of pants.
Why did the toilet paper roll down the hill? | To get to the bottom.
Why is the mushroom always invited to parties? | He's a fungi.
What kind of music do mummies like? | Wrap music.
What do you call a sleeping pizza? | A piz-zzz-a.
What do you get if you cross a snowman and a vampire? | Frostbite.
Why did the bread break up with the butter? | It felt spread too thin.
What do you call an angry carrot? | A steamed veggie.
Why did the cucumber call a lawyer? | It was in a pickle.
What does a lemon say when it answers the phone? | Yellow!
What do you call two birds in love? | Tweethearts.
What's a bunny's favourite kind of music? | Hip hop.
Why did the teddy bear skip dessert? | It was already stuffed.
What do you call a dog on a summer day? | A hot dog.
What did the stamp say to the envelope? | Stick with me and we'll go places.
Why did the girl spread peanut butter on the road? | To go with the traffic jam.
How does a cat sing? | Meow-sically.
What do you call a pig with three eyes? | A piiig.
Why are ghosts terrible liars? | You can see right through them.
What room can nobody enter? | A mushroom.
What did the tree say when spring finally came? | What a re-leaf!
What does a tired kitten take after lunch? | A cat nap.
What did the duck say after shopping? | Put it on my bill.
What do you call a cow that plays the piano? | A moo-sician.
What do you call a cow in an earthquake? | A milkshake.
What do you call a fish with no eye? | A fsh.
Why do bananas wear sunscreen? | So they don't peel.
Why did the donut visit the dentist? | To get a filling.
What's a pirate's favourite letter? | You'd think it's R, but their true love is the C.
How do you make an octopus laugh? | With ten-tickles.
What did the mama tomato say to the slow baby tomato? | Ketchup!
Why don't pirates take baths? | They just wash up on shore.
What does a cat use to make coffee? | A purr-colator.
Where do cats write their notes? | On scratch paper.
What did the cat say when it lost all its money? | I'm paw.
Why do cats always win video games? | They have nine lives.
What kind of car does a cat drive? | A Cat-illac.
What do you call a lion who ate your mum's sister? | An aunt-eater.
Why did the moon break up with the sun? | It needed some space.
Why did the chocolate chip cookie cry? | Its mum had been a wafer so long.
What do you call a guy lying on your doorstep? | Matt.
What do you call a woman who sounds like an ambulance? | Nina.
What did the sock say to the foot? | You're putting me on!
Why did the pillow go to the doctor? | It was feeling down.
What do you call a shy pebble? | A little boulder.
Why don't blankets ever get lost? | They're always covered.
What did the tea say to the kettle? | You're steaming hot.
Why did the strawberry cry? | It was stuck in a jam.
Why did the whale cross the ocean? | To get to the other tide.
What do you call a sad cup of coffee? | Depresso.
Why did the pirate wear an eye patch? | He couldn't afford an iPad.
What do you call a cat that naps all day and all night? | A purr-manent sleeper.
What do you call a kitten that solves mysteries? | Sherlock Paws.
`;

const ZH = `
什么动物最容易摔倒？ | 狐狸，因为它很“狡猾”（脚滑）。
为什么老虎不能玩电脑？ | 因为它怕“鼠”标。
什么鱼最安静？ | 墨鱼，因为它一直“默”默无语。
什么书在书店买不到？ | 秘书。
什么布剪不断？ | 瀑布。
什么蛋不能吃？ | 笨蛋。
为什么蚕宝宝很有钱？ | 因为它会“结茧”（节俭）。
为什么飞机飞那么高，都不会撞到星星？ | 因为星星会“闪”。
哪个数字最懒，哪个数字最勤劳？ | 一最懒，二最勤劳——“一不做，二不休”。
小鸡为什么从来不怕考试？ | 因为它很“鸡”智（机智）。
小明为什么把闹钟扔出窗外？ | 他想亲眼看看什么叫“时光飞逝”。
一根火柴走在路上，头很痒就挠了挠，结果呢？ | 着火了！去医院包扎完，出来变成了一根棉签。
北极熊太无聊，把自己的毛一根一根拔光，最后说了什么？ | “好冷啊……”
我最近为什么不吃梨？ | 因为我已经“鸭梨”（压力）山大了。
什么水果最忙？ | 芒果——“忙”果。
为什么情侣不能分梨吃？ | 因为“分梨”听起来像“分离”。
什么水果最着急？ | 香蕉，因为它心急如“蕉”（焚）。
什么水果最倒霉？ | 草莓，因为它倒“莓”（霉）。
什么水果最爱逃跑？ | 桃子，因为它是“逃”子。
什么水果最诚实？ | 橙子，“诚”实可靠。
什么水果最讲道理？ | 李子，因为它有“李”（理）。
什么水果最舍不得你？ | 榴莲，因为它“留恋”你。
什么水果最多事？ | 柿子，因为它“事”儿最多。
什么水果最励志？ | 荔枝——“励志”！
什么水果运气最好？ | 杏子，“杏”（幸）运儿！
什么水果起得最早？ | 枣子，因为它很“早”。
什么坚果最会举例子？ | 栗子，因为它就是“例”子。
大蒜为什么数学最好？ | 因为它最会“蒜”（算）。
小葱为什么考试总拿第一？ | 因为它很“葱”（聪）明。
豆子为什么总是笑嘻嘻？ | 因为它一直在“逗”自己开心。
为什么茄子最上镜？ | 因为大家拍照时都在喊它的名字。
什么瓜最会认路？ | 冬（东）瓜、南瓜、西瓜……北瓜还在路上。
为什么大家都喜欢吃生菜？ | 因为“生菜”就是“生财”。
什么菜最勤劳？ | 芹菜，“勤”菜。
什么菜最长久？ | 韭菜，因为它“久”。
为什么鹅总是吃不饱？ | 因为它一直喊“鹅”（饿）。
为什么猪是最好的朋友？ | 因为它总是“猪”（祝）你开心。
为什么狗从来不贪心？ | 因为它总说：“狗（够）了狗了！”
什么动物最阳光？ | 羊，因为它“羊”（阳）光开朗。
老鼠为什么数学最好？ | 因为它很会“鼠”（数）数。
为什么老虎说的话不能信？ | 因为它在“虎”（唬）你。
兔子为什么不能坐船？ | 因为它会“兔”（吐）。
为什么龙听不到你说话？ | 因为它是“龙”（聋）的。
什么动物最大方？ | 蛇，因为它“蛇”（舍）得。
为什么马最适合当作家？ | 因为它每天都在“马”（码）字。
为什么猴子最有耐心？ | 因为它很会“等猴”（候）。
什么动物最浪漫？ | 狼，因为它很“狼”（浪）漫。
为什么熊不能当幼儿园老师？ | 因为它太“熊”（凶）了。
猫咪最喜欢哪个字？ | “喵”——妙不可言！
猫咪去银行做什么？ | 存“喵”（毛）爷爷。
鹿为什么从来不迷路？ | 因为它自己就是“鹿”（路）。
为什么大象最爱做白日梦？ | 因为它特别会“象”（想）。
什么动物最容易受惊？ | 鲸鱼，因为它是“惊”鱼。
螃蟹为什么最有礼貌？ | 因为它总说“蟹蟹”（谢谢）。
虾为什么什么都不怕？ | 它说：“开玩笑，我可是‘虾’（吓）大的！”
什么昆虫最爱提问？ | 蚊子，因为它是“问”子。
蜗牛为什么那么自信？ | 因为它的名字就叫“我牛”。
什么鸟最会唱歌？ | 鸽子，因为它是“歌”子。
为什么不要跟鸽子约会？ | 因为它一定会放你“鸽子”。
一只豹子走进包子店，说了什么？ | “老板，我来找我失散多年的兄弟。”
为什么饺子最会撒娇？ | 因为它总是“饺”（娇）滴滴的。
为什么过节要吃汤圆？ | 因为吃了汤圆才能“团圆”。
面条为什么总是很难过？ | 因为大家都说它“没面子”。
为什么粥最适合周末吃？ | 因为它是“粥”（周）末限定。
奶茶对白开水说了什么？ | “你看你，一点‘料’都没有。”
可乐为什么一直在笑？ | 因为它“可乐”了。
咖啡为什么总是很累？ | 因为它被“磨”了一整天。
为什么茶最适合当警察？ | 因为它最会“茶”（查）案。
酱油为什么总被说是路人？ | 因为它一直在“打酱油”。
醋为什么人缘不好？ | 因为它太爱“吃醋”了。
盐为什么能当明星？ | 因为它是“盐”（颜）值担当。
糖为什么总是那么懒？ | 因为它只想“糖”（躺）着。
鸡蛋为什么总是很冷静？ | 因为它很“蛋”（淡）定。
饼干为什么不敢去医院？ | 怕医生说它“饼”（病）了。
为什么粽子能当老板？ | 因为它是“粽”（总）。
数字 8 为什么那么开心？ | 因为它“发”了！
为什么星星从来不吵架？ | 因为它们“星星”（惺惺）相惜。
雨为什么下得那么急？ | 因为它赶着“下”班。
为什么风不能当老师？ | 因为它太会“吹”牛了。
闪电为什么跑那么快？ | 因为它怕被“雷”到。
为什么姨妈来了要喝红糖水？ | 大姨妈说：“来都来了，总要给点甜头吧。”
大姨妈为什么每个月都来？ | 因为她把你这里当“月”租房了。
暖宝宝为什么人气那么高？ | 因为它真的很“暖”心。
为什么经期不能吵架？ | 因为“大姨妈”在家，要给长辈面子。
绿豆从楼上跳下来，流了很多血，变成了什么？ | 红豆。
什么东西越洗越脏？ | 水。
为什么企鹅的肚子是白色的？ | 因为手太短，洗澡只洗得到肚子。
蜗牛被乌龟撞了，警察问它经过，它说什么？ | “太快了，我什么都没看清！”
青蛙为什么能跳得比树还高？ | 因为树不会跳。
什么人一年只上一天班？ | 圣诞老人。
什么动物最喜欢熬夜？ | 夜猫子。
什么车寸步难行？ | 风车。
什么牛不吃草？ | 蜗牛。
为什么熊猫拍不了彩色照片？ | 因为它是黑白的。
小羊做错事被抓到，它说了什么？ | “咩（没）看见我，你什么都没看见！”
为什么牛总是很骄傲？ | 因为大家都夸它“很牛”。
白菜为什么那么受欢迎？ | 因为“白菜”谐音“百财”。
冬瓜为什么只在冬天出门？ | 因为它的名字写着“冬”，夏天出门怕被认错。
为什么土豆总是很开心？ | 因为它“土”是“土”了点，但很“豆”（逗）。
番茄和西红柿是什么关系？ | 一个是本名，一个是艺名。
胡萝卜为什么视力那么好？ | 因为它天天吃……胡萝卜。
蘑菇为什么做事慢吞吞？ | 因为它很爱“磨菇”（磨蹭）。
黄瓜为什么总是那么冷静？ | 因为它“cool”得像根黄瓜。
莲藕为什么朋友那么多？ | 因为它“藕”断了还“丝”连着。
为什么年夜饭一定要有鱼？ | 因为“年年有鱼”（余）。
金鱼为什么只有七秒记忆？ | 因为第八秒，它忘了自己要记什么。
为什么柚子最自信？ | 它说：“我柚（有）我的骄傲！”
花生为什么那么无辜？ | 它说：“我什么都没做，怎么就‘花生’（发生）这种事了？”
姜对葱说了什么？ | “别得意，我才是‘姜’（将）来的状元！”
苦瓜为什么总是很悲观？ | 因为它从小就“苦”。
菠萝和凤梨吵了一架，谁赢了？ | 都没赢，因为它们其实是同一个人。
香菜去参加选美，评委怎么说？ | 一半评委打满分，另一半评委已经吐了。
什么门永远关不上？ | 球门。
什么瓜不能吃？ | 傻瓜。
什么花最怕热？ | 雪花。
什么桥下面没有水？ | 立交桥。
什么床不能睡？ | 河床。
什么球离你最近？ | 眼球。
什么路最窄？ | 冤家路窄。
什么话全世界都通用？ | 电话。
什么东西有五个头，大家却不觉得奇怪？ | 手和脚（五个指头）。
什么人整天都在“刷”，却一点都不干净？ | 刷手机的人。
什么东西天气越热，爬得越高？ | 温度计。
什么东西你的右手永远拿不到？ | 你的右手。
什么东西越分越多？ | 快乐，当然还有……笑话。
为什么爸爸的头发越来越少？ | 因为他每天都在“发”愁，愁到“发”都没了。
为什么学生最怕“鸡”？ | 因为“鸡”（及）格线就在那里。
为什么作业本总是很紧张？ | 因为老师每天都要“批”它。
黑板为什么很委屈？ | 每天都有人在它脸上写字，写完还擦掉。
橡皮为什么不怕犯错？ | 因为它天生就是来“擦”屁股的。
为什么尺子最正直？ | 因为它从来不走弯路。
为什么钱包总是很瘦？ | 因为它一直在被“花”光减肥。
闹钟为什么没有朋友？ | 因为它每天早上都“吵”醒别人。
枕头为什么总是心情低落？ | 因为它天天被“压”着。
被子为什么最受冬天欢迎？ | 因为它“被”（备）受宠爱。
拖鞋为什么总是很懒？ | 因为它一直在“拖”。
袜子为什么总是只剩一只？ | 因为另一只去追寻“袜”（娃）娃梦想了。
雨伞为什么总是很辛苦？ | 因为每次下雨，它都得“撑”着。
冰箱为什么那么冷漠？ | 因为它的心就是“冷”的。
空调为什么人见人爱？ | 因为它很“酷”，还很“凉”快。
电风扇为什么总是很晕？ | 因为它每天都在转圈圈。
灯泡为什么总是很有想法？ | 因为它一亮就是“灵光一闪”。
手机为什么总是没精神？ | 因为它总是“电量不足”，跟你周一一模一样。
Wi-Fi 为什么没有朋友？ | 因为它动不动就“断联”。
键盘为什么总是很累？ | 因为它每天都被人“敲”。
鼠标为什么那么怕猫？ | 因为它的名字里有个“鼠”。
为什么打印机脾气那么差？ | 因为它总是“卡纸”，还要被骂。
遥控器为什么总是失踪？ | 因为它想“遥”（逃）离沙发。
为什么公交车最守信用？ | 它说几点到……其实也不会到。
为什么红绿灯那么害羞？ | 因为它一会儿红，一会儿绿。
为什么斑马要穿条纹衣服？ | 因为它要去走斑马线。
长颈鹿为什么不怕感冒？ | 因为病毒爬到它脖子一半就累了。
为什么袋鼠从来不买包？ | 因为它自带“口袋”。
海豚为什么总在笑？ | 因为它的嘴天生是弯的，想不笑都难。
章鱼为什么盖章最快？ | 因为它有八只手可以一起“盖章”。
乌龟为什么从来不迟到？ | 因为它提前三天就出门了。
为什么鸭子总是很淡定？ | 因为它“鸭”（压）根儿不在乎。
为什么鸡总是那么上进？ | 因为它很“鸡”（积）极向上。
公鸡为什么每天早上都叫？ | 因为它没有闹钟，只好自己当闹钟。
狮子为什么总是很威风？ | 因为它天天都在“狮”（施）展魅力。
为什么松鼠不怕冬天？ | 因为它早就把零食藏好，“松”了一口气。
蝴蝶为什么那么漂亮？ | 因为它以前是毛毛虫，后来“蝶”（叠）加了美颜滤镜。
萤火虫为什么不怕黑？ | 因为它自带手电筒。
蜜蜂为什么总是那么忙？ | 因为它要“蜂”（疯）狂加班。
蚂蚁为什么从来不生病？ | 因为它体内有“蚁”（益）生菌。
蜘蛛为什么最会上网？ | 因为它天天都在“织网”。
为什么鹦鹉不能保守秘密？ | 因为它会把你说的话全部重复一遍。
企鹅为什么总是站着？ | 因为它的名字里有个“企”（踮脚站）。
熊猫为什么总是有黑眼圈？ | 因为它天天熬夜刷手机。
猫为什么爱钻纸箱？ | 因为它觉得自己是快递，要把自己寄给喜欢的人。
小猫为什么不去上学？ | 因为它说：“喵（没）兴趣。”
猫为什么那么爱晒太阳？ | 因为它想变成“晒猫”（帅猫）。
猫为什么老是把杯子推下桌？ | 因为它在做“地心引力”实验。
为什么猫总爱踩键盘？ | 因为它想帮你回复老板的消息。
为什么不能跟猫打牌？ | 因为它总是“喵”（瞄）你的牌。
为什么鱼不说话？ | 因为它一开口就“吐泡泡”。
为什么海是蓝色的？ | 因为鱼在水里一直“blue blue blue”地吐泡泡。
太阳为什么从来不迟到？ | 因为它要是迟到，全世界都会发现。
为什么月亮有时候是弯弯的？ | 因为它在给你比“半个心”。
云朵为什么那么软？ | 因为它每天只吃棉花糖。
为什么彩虹总是雨后才出现？ | 因为它要等雨把舞台擦干净。
为什么冬天特别想赖床？ | 因为被窝在说：“‘冬’（懂）我的人，都留下来。”
`;

const parse = (txt) =>
  txt
    .trim()
    .split('\n')
    .map((line) => line.split(' | ').map((s) => s.trim()));

export const JOKES_EN = parse(EN);
export const JOKES_ZH = parse(ZH);

// One joke per day, English and Chinese taking turns.
// Any 365 days in a row show 365 different jokes.
export function jokeForDay(dayNumber) {
  const i = ((dayNumber % 365) + 365) % 365;
  const [q, a] = i % 2 === 0 ? JOKES_EN[i / 2] : JOKES_ZH[(i - 1) / 2];
  return { q, a, number: i + 1, lang: i % 2 === 0 ? 'en' : 'zh' };
}
