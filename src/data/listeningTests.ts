import { ListeningTest } from '../types';

export const LISTENING_TESTS: ListeningTest[] = [
  // ================= A1 TESTS =================
  {
    id: 'a1-test-01',
    level: 'A1',
    title: 'School & Classroom Supplies',
    vietnameseTitle: 'Trường học & Đồ dùng học tập',
    topic: 'School Life',
    topicVi: 'Đời sống học đường',
    difficulty: 'Dễ',
    estimatedMinutes: 6,
    description: 'Listen to a teacher and students discussing classroom materials and morning lessons.',
    descriptionVi: 'Nghe đoạn hội thoại giữa cô giáo và học sinh về đồ dùng học tập và tiết học buổi sáng.',
    vocabulary: [
      {
        word: 'pencil case',
        ipa: '/ˈpensl keɪs/',
        meaning: 'hộp bút',
        example: 'Put your colored pens in your pencil case.',
        exampleVi: 'Hãy để bút màu vào trong hộp bút của em.'
      },
      {
        word: 'ruler',
        ipa: '/ˈruːlə(r)/',
        meaning: 'thước kẻ',
        example: 'Can I borrow your 30-centimeter ruler?',
        exampleVi: 'Mình có thể mượn chiếc thước 30cm của bạn không?'
      },
      {
        word: 'notebook',
        ipa: '/ˈnəʊtbʊk/',
        meaning: 'vở ghi chép',
        example: 'Open your English notebook to page ten.',
        exampleVi: 'Hãy mở vở tiếng Anh ra trang số mười.'
      },
      {
        word: 'sharpener',
        ipa: '/ˈʃɑːpnə(r)/',
        meaning: 'gọt bút chì',
        example: 'I have a small blue sharpener.',
        exampleVi: 'Tôi có một chiếc gọt bút chì nhỏ màu xanh da trời.'
      }
    ],
    transcripts: [
      {
        id: 't1-1',
        speaker: 'Teacher (Ms. Green)',
        text: 'Good morning, class! Welcome to our English lesson today.',
        viText: 'Chào cả lớp! Chào mừng các em đến với tiết học tiếng Anh hôm nay.'
      },
      {
        id: 't1-2',
        speaker: 'Teacher (Ms. Green)',
        text: 'Please take out your blue English books and put them on your desks.',
        viText: 'Các em hãy lấy sách tiếng Anh màu xanh dương ra và đặt lên bàn nhé.'
      },
      {
        id: 't1-3',
        speaker: 'Peter',
        text: 'Excuse me, Ms. Green, I forgot my pencil case at home. May I borrow a pencil?',
        viText: 'Xin lỗi cô Green, em để quên hộp bút ở nhà. Em có thể mượn một cây bút chì không ạ?'
      },
      {
        id: 't1-4',
        speaker: 'Teacher (Ms. Green)',
        text: 'Yes, Peter. You can take one from my desk. Don\'t forget to use the eraser if you make a mistake.',
        viText: 'Được chứ Peter. Em có thể lấy một cây trên bàn cô. Đừng quên dùng cục tẩy nếu viết sai nhé.'
      },
      {
        id: 't1-5',
        speaker: 'Teacher (Ms. Green)',
        text: 'Now everyone, please turn to page fifteen. We will start reading the story.',
        viText: 'Bây giờ cả lớp hãy mở trang mười lăm. Chúng ta sẽ bắt đầu đọc câu chuyện.'
      }
    ],
    questions: [
      {
        id: 'q1-1',
        type: 'multiple_choice',
        prompt: 'What color is the English book students need to take out?',
        promptVi: 'Cuốn sách tiếng Anh mà học sinh cần lấy ra có màu gì?',
        options: [
          { id: 'opt-a', text: 'Red' },
          { id: 'opt-b', text: 'Blue' },
          { id: 'opt-c', text: 'Green' },
          { id: 'opt-d', text: 'Yellow' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Ms. Green specifically says: "Please take out your blue English books and put them on your desks."',
        explanationVi: 'Cô Green nói rõ: "Please take out your blue English books" (Hãy lấy sách tiếng Anh màu xanh dương ra).',
        transcriptClue: 'Please take out your blue English books and put them on your desks.'
      },
      {
        id: 'q1-2',
        type: 'multiple_choice',
        prompt: 'What did Peter leave at home?',
        promptVi: 'Peter đã để quên thứ gì ở nhà?',
        options: [
          { id: 'opt-a', text: 'His backpack' },
          { id: 'opt-b', text: 'His lunchbox' },
          { id: 'opt-c', text: 'His pencil case' },
          { id: 'opt-d', text: 'His homework' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Peter says: "I forgot my pencil case at home."',
        explanationVi: 'Peter nói: "I forgot my pencil case at home" (Em để quên hộp bút ở nhà).',
        transcriptClue: 'I forgot my pencil case at home. May I borrow a pencil?'
      },
      {
        id: 'q1-3',
        type: 'fill_in_blank',
        prompt: 'Which page number does the teacher tell the class to open?',
        promptVi: 'Cô giáo bảo cả lớp mở trang số mấy? (Điền số hoặc chữ)',
        correctAnswer: '15',
        acceptableAnswers: ['15', 'fifteen', 'page 15'],
        explanation: 'The teacher states: "Now everyone, please turn to page fifteen."',
        explanationVi: 'Cô giáo nói: "Now everyone, please turn to page fifteen" (Trang số 15).',
        transcriptClue: 'Now everyone, please turn to page fifteen.'
      },
      {
        id: 'q1-4',
        type: 'true_false',
        prompt: 'Peter has to buy a pencil from the school shop.',
        promptVi: 'Peter phải mua bút chì từ cửa hàng của trường.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Ms. Green lets Peter take one from her desk.',
        explanationVi: 'Sai. Cô Green cho phép Peter lấy một cây bút chì từ bàn của cô giáo.',
        transcriptClue: 'Yes, Peter. You can take one from my desk.'
      },
      {
        id: 'q1-5',
        type: 'multiple_choice',
        prompt: 'What will the class do after opening the page?',
        promptVi: 'Cả lớp sẽ làm gì sau khi mở trang sách?',
        options: [
          { id: 'opt-a', text: 'Draw a picture' },
          { id: 'opt-b', text: 'Start reading the story' },
          { id: 'opt-c', text: 'Sing an English song' },
          { id: 'opt-d', text: 'Do a grammar test' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Ms. Green concludes: "We will start reading the story."',
        explanationVi: 'Cô Green kết luận: "We will start reading the story" (Chúng ta sẽ bắt đầu đọc truyện).',
        transcriptClue: 'We will start reading the story.'
      }
    ]
  },
  {
    id: 'a1-test-02',
    level: 'A1',
    title: 'Daily Routine & Telling Time',
    vietnameseTitle: 'Thói quen hàng ngày & Xem giờ',
    topic: 'Daily Life',
    topicVi: 'Sinh hoạt thường ngày',
    difficulty: 'Dễ',
    estimatedMinutes: 6,
    description: 'Listen to Tom talking about his morning schedule, breakfast, and how he travels to school.',
    descriptionVi: 'Nghe bạn Tom chia sẻ về lịch trình buổi sáng, bữa ăn sáng và cách bạn ấy đến trường.',
    vocabulary: [
      {
        word: 'quarter past',
        ipa: '/ˈkwɔːtə pɑːst/',
        meaning: 'hơn 15 phút (giờ + 15)',
        example: 'I wake up at a quarter past six.',
        exampleVi: 'Tôi thức dậy lúc 6 giờ 15 phút.'
      },
      {
        word: 'cereal',
        ipa: '/ˈsɪəriəl/',
        meaning: 'ngũ cốc ăn sáng',
        example: 'Do you eat cereal with warm milk?',
        exampleVi: 'Bạn có ăn ngũ cốc với sữa ấm không?'
      },
      {
        word: 'brush teeth',
        ipa: '/brʌʃ tiːθ/',
        meaning: 'đánh răng',
        example: 'Remember to brush your teeth twice a day.',
        exampleVi: 'Nhớ đánh răng hai lần mỗi ngày.'
      },
      {
        word: 'catch the bus',
        ipa: '/kætʃ ðə bʌs/',
        meaning: 'bắt xe buýt',
        example: 'We catch the number 8 bus at 7:30.',
        exampleVi: 'Chúng tôi bắt xe buýt số 8 lúc 7 giờ 30.'
      }
    ],
    transcripts: [
      {
        id: 't2-1',
        speaker: 'Tom',
        text: 'Hi, I am Tom. Every weekday, my alarm rings at half past six.',
        viText: 'Chào các bạn, mình là Tom. Mỗi ngày trong tuần, đồng hồ báo thức của mình reo lúc 6 giờ 30.'
      },
      {
        id: 't2-2',
        speaker: 'Tom',
        text: 'I get out of bed, wash my face, and brush my teeth.',
        viText: 'Mình ra khỏi giường, rửa mặt và đánh răng.'
      },
      {
        id: 't2-3',
        speaker: 'Tom',
        text: 'At seven o\'clock, I have breakfast with my sister Emma. I usually have warm milk and toast with strawberry jam.',
        viText: 'Vào lúc 7 giờ đúng, mình ăn sáng cùng em gái Emma. Mình thường uống sữa ấm và ăn bánh mì nướng mứt dâu tây.'
      },
      {
        id: 't2-4',
        speaker: 'Tom',
        text: 'My school starts at eight o\'clock. I walk to the bus stop at seven twenty, and the bus arrives at seven twenty-five.',
        viText: 'Trường học của mình bắt đầu lúc 8 giờ. Mình đi bộ ra trạm xe buýt lúc 7 giờ 20, và xe buýt đến lúc 7 giờ 25.'
      },
      {
        id: 't2-5',
        speaker: 'Tom',
        text: 'It takes only ten minutes to get to school, so I never arrive late!',
        viText: 'Chỉ mất mười phút là đến trường, nên mình chưa bao giờ bị muộn học!'
      }
    ],
    questions: [
      {
        id: 'q2-1',
        type: 'multiple_choice',
        prompt: 'What time does Tom\'s alarm ring?',
        promptVi: 'Đồng hồ báo thức của Tom reo vào lúc mấy giờ?',
        options: [
          { id: 'opt-a', text: '6:00' },
          { id: 'opt-b', text: '6:30' },
          { id: 'opt-c', text: '7:00' },
          { id: 'opt-d', text: '7:30' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Tom says: "my alarm rings at half past six" (6:30).',
        explanationVi: 'Tom nói: "my alarm rings at half past six" nghĩa là 6 giờ 30 phút.',
        transcriptClue: 'my alarm rings at half past six.'
      },
      {
        id: 'q2-2',
        type: 'multiple_choice',
        prompt: 'What does Tom eat for breakfast?',
        promptVi: 'Tom ăn gì cho bữa sáng?',
        options: [
          { id: 'opt-a', text: 'Pancakes and apple juice' },
          { id: 'opt-b', text: 'Toast with strawberry jam and warm milk' },
          { id: 'opt-c', text: 'Fried eggs and sausages' },
          { id: 'opt-d', text: 'A bowl of chocolate cereal' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Tom says: "I usually have warm milk and toast with strawberry jam."',
        explanationVi: 'Tom nói: "warm milk and toast with strawberry jam" (sữa ấm và bánh mì nướng mứt dâu).',
        transcriptClue: 'I usually have warm milk and toast with strawberry jam.'
      },
      {
        id: 'q2-3',
        type: 'fill_in_blank',
        prompt: 'What time does the school bus arrive at the stop?',
        promptVi: 'Mấy giờ thì xe buýt tới trạm đón? (Ví dụ: 7:25)',
        correctAnswer: '7:25',
        acceptableAnswers: ['7:25', '7.25', 'seven twenty-five', '7:25 am'],
        explanation: 'Tom mentions: "the bus arrives at seven twenty-five" (7:25).',
        explanationVi: 'Tom chia sẻ: "the bus arrives at seven twenty-five" (7 giờ 25).',
        transcriptClue: 'and the bus arrives at seven twenty-five.'
      },
      {
        id: 'q2-4',
        type: 'multiple_choice',
        prompt: 'How long does the bus journey take?',
        promptVi: 'Chuyến xe buýt mất bao lâu để đến trường?',
        options: [
          { id: 'opt-a', text: '5 minutes' },
          { id: 'opt-b', text: '10 minutes' },
          { id: 'opt-c', text: '15 minutes' },
          { id: 'opt-d', text: '20 minutes' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Tom says: "It takes only ten minutes to get to school."',
        explanationVi: 'Tom nói: "It takes only ten minutes to get to school" (Chỉ mất mười phút).',
        transcriptClue: 'It takes only ten minutes to get to school'
      },
      {
        id: 'q2-5',
        type: 'true_false',
        prompt: 'Tom eats breakfast alone in his room.',
        promptVi: 'Tom ăn sáng một mình trong phòng ngủ.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Tom has breakfast with his sister Emma.',
        explanationVi: 'Sai. Tom nói bạn ấy ăn sáng cùng em gái Emma ("with my sister Emma").',
        transcriptClue: 'At seven o\'clock, I have breakfast with my sister Emma.'
      }
    ]
  },
  {
    id: 'a1-test-03',
    level: 'A1',
    title: 'Shopping for Fruit & Vegetables',
    vietnameseTitle: 'Mua sắm rau củ & Hoa quả',
    topic: 'Shopping & Food',
    topicVi: 'Mua sắm & Thực phẩm',
    difficulty: 'Trung bình',
    estimatedMinutes: 6,
    description: 'Listen to Sarah buying fresh apples, bananas, and carrots at the grocery store.',
    descriptionVi: 'Nghe bạn Sarah mua táo tươi, chuối và cà rốt tại quầy bán rau quả.',
    vocabulary: [
      {
        word: 'kilo / kilogram',
        ipa: '/ˈkiːləʊ/',
        meaning: 'ki-lô-gam (kg)',
        example: 'How much is one kilo of red apples?',
        exampleVi: 'Một ký táo đỏ có giá bao nhiêu?'
      },
      {
        word: 'bunch',
        ipa: '/bʌntʃ/',
        meaning: 'nải (chuối), bó (hoa, rau)',
        example: 'Give me a ripe bunch of bananas.',
        exampleVi: 'Cho cháu một nải chuối chín nhé.'
      },
      {
        word: 'change',
        ipa: '/tʃeɪndʒ/',
        meaning: 'tiền thừa trả lại',
        example: 'Here is your change and the receipt.',
        exampleVi: 'Đây là tiền thừa và hóa đơn của bạn.'
      }
    ],
    transcripts: [
      {
        id: 't3-1',
        speaker: 'Shopkeeper',
        text: 'Hello young lady! How can I help you today?',
        viText: 'Xin chào cháu gái! Hôm nay bác có thể giúp gì cho cháu nào?'
      },
      {
        id: 't3-2',
        speaker: 'Sarah',
        text: 'Good afternoon, sir. I would like one kilo of red apples, please.',
        viText: 'Cháu chào bác. Cháu muốn mua một ký táo đỏ ạ.'
      },
      {
        id: 't3-3',
        speaker: 'Shopkeeper',
        text: 'Sure thing! The red apples are two dollars per kilo. Would you like anything else?',
        viText: 'Được chứ! Táo đỏ có giá 2 đô la một ký. Cháu có muốn lấy thêm gì không?'
      },
      {
        id: 't3-4',
        speaker: 'Sarah',
        text: 'Yes, please give me a bunch of bananas and half a kilo of carrots for my rabbit.',
        viText: 'Dạ có, bác cho cháu thêm một nải chuối và nửa ký cà rốt cho chú thỏ của cháu nhé.'
      },
      {
        id: 't3-5',
        speaker: 'Shopkeeper',
        text: 'That will be five dollars in total, please. Here is your bag!',
        viText: 'Tổng cộng tất cả là năm đô la nhé. Đây là túi đồ của cháu!'
      }
    ],
    questions: [
      {
        id: 'q3-1',
        type: 'multiple_choice',
        prompt: 'How much is one kilo of red apples?',
        promptVi: 'Một ký táo đỏ có giá bao nhiêu?',
        options: [
          { id: 'opt-a', text: 'One dollar' },
          { id: 'opt-b', text: 'Two dollars' },
          { id: 'opt-c', text: 'Three dollars' },
          { id: 'opt-d', text: 'Five dollars' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The shopkeeper says: "The red apples are two dollars per kilo."',
        explanationVi: 'Người bán hàng nói: "The red apples are two dollars per kilo" (2 đô la/kg).',
        transcriptClue: 'The red apples are two dollars per kilo.'
      },
      {
        id: 'q3-2',
        type: 'multiple_choice',
        prompt: 'Why does Sarah buy carrots?',
        promptVi: 'Tại sao Sarah lại mua cà rốt?',
        options: [
          { id: 'opt-a', text: 'To make vegetable soup' },
          { id: 'opt-b', text: 'For her pet rabbit' },
          { id: 'opt-c', text: 'For her grandmother' },
          { id: 'opt-d', text: 'For a school project' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Sarah says: "half a kilo of carrots for my rabbit."',
        explanationVi: 'Sarah giải thích: "carrots for my rabbit" (cà rốt cho chú thỏ cưng).',
        transcriptClue: 'and half a kilo of carrots for my rabbit.'
      },
      {
        id: 'q3-3',
        type: 'fill_in_blank',
        prompt: 'What is the total price Sarah needs to pay?',
        promptVi: 'Tổng số tiền Sarah phải trả là bao nhiêu đô la? (Điền số: 5 hoặc chữ: five)',
        correctAnswer: '5',
        acceptableAnswers: ['5', 'five', '$5', '5 dollars'],
        explanation: 'The shopkeeper states: "That will be five dollars in total, please."',
        explanationVi: 'Người bán hàng báo: "That will be five dollars in total" (Năm đô la).',
        transcriptClue: 'That will be five dollars in total, please.'
      },
      {
        id: 'q3-4',
        type: 'multiple_choice',
        prompt: 'How many kilos of carrots did Sarah buy?',
        promptVi: 'Sarah đã mua bao nhiêu ký cà rốt?',
        options: [
          { id: 'opt-a', text: 'Half a kilo' },
          { id: 'opt-b', text: 'One kilo' },
          { id: 'opt-c', text: 'Two kilos' },
          { id: 'opt-d', text: 'Five kilos' }
        ],
        correctAnswer: 'opt-a',
        explanation: 'Sarah says: "half a kilo of carrots"',
        explanationVi: 'Sarah nói: "half a kilo of carrots" (nửa ký cà rốt).',
        transcriptClue: 'and half a kilo of carrots for my rabbit.'
      },
      {
        id: 'q3-5',
        type: 'true_false',
        prompt: 'Sarah also bought some strawberries.',
        promptVi: 'Sarah cũng đã mua một ít dâu tây.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Sarah only bought apples, bananas, and carrots.',
        explanationVi: 'Sai. Sarah chỉ mua táo, chuối và cà rốt, không mua dâu tây.',
        transcriptClue: 'I would like one kilo of red apples... a bunch of bananas and half a kilo of carrots'
      }
    ]
  },
  {
    id: 'a1-test-04',
    level: 'A1',
    title: 'At the Pet Store & Animals',
    vietnameseTitle: 'Tại tiệm thú cưng & Động vật',
    topic: 'Animals & Pets',
    topicVi: 'Động vật & Thú cưng',
    difficulty: 'Dễ',
    estimatedMinutes: 5,
    description: 'Listen to Leo and his father choosing a new pet at the happy pet center.',
    descriptionVi: 'Nghe hai bố con bạn Leo đi chọn thú cưng mới tại cửa hàng.',
    vocabulary: [
      {
        word: 'puppy',
        ipa: '/ˈpʌpi/',
        meaning: 'chó con',
        example: 'The golden puppy has floppy ears.',
        exampleVi: 'Chú chó con màu vàng có đôi tai cụp.'
      },
      {
        word: 'kitten',
        ipa: '/ˈkɪtn/',
        meaning: 'mèo con',
        example: 'The tiny kitten is sleeping in a basket.',
        exampleVi: 'Chú mèo con bé xíu đang ngủ trong giỏ.'
      },
      {
        word: 'friendly',
        ipa: '/ˈfrendli/',
        meaning: 'thân thiện, hiền lành',
        example: 'This dog is very friendly with young children.',
        exampleVi: 'Chú chó này rất thân thiện với trẻ nhỏ.'
      }
    ],
    transcripts: [
      {
        id: 't4-1',
        speaker: 'Dad',
        text: 'Look, Leo! There are so many cute animals here today.',
        viText: 'Nhìn kìa Leo! Hôm nay ở đây có thật nhiều con vật dễ thương.'
      },
      {
        id: 't4-2',
        speaker: 'Leo',
        text: 'Dad, can we look at the puppies first? I love dogs!',
        viText: 'Bố ơi, chúng mình qua xem mấy chú cún con trước được không? Con thích chó lắm!'
      },
      {
        id: 't4-3',
        speaker: 'Dad',
        text: 'Sure. Look at the little black puppy with white paws over there. He is wagging his tail.',
        viText: 'Được chứ. Nhìn chú cún con màu đen có 4 chân màu trắng đằng kia kìa. Nó đang vẫy đuôi đấy.'
      },
      {
        id: 't4-4',
        speaker: 'Leo',
        text: 'Oh, he is so active! What is his name on the sign?',
        viText: 'Ôi, nó hiếu động quá! Tên của nó ghi trên bảng là gì vậy bố?'
      },
      {
        id: 't4-5',
        speaker: 'Dad',
        text: 'His name is Toby. He is three months old and loves playing with rubber balls.',
        viText: 'Tên nó là Toby. Chú cún được ba tháng tuổi và rất thích chơi với bóng cao su.'
      }
    ],
    questions: [
      {
        id: 'q4-1',
        type: 'multiple_choice',
        prompt: 'What animal does Leo want to see first?',
        promptVi: 'Leo muốn đến xem con vật nào trước tiên?',
        options: [
          { id: 'opt-a', text: 'Kittens' },
          { id: 'opt-b', text: 'Puppies' },
          { id: 'opt-c', text: 'Parrots' },
          { id: 'opt-d', text: 'Fish' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Leo asks: "can we look at the puppies first? I love dogs!"',
        explanationVi: 'Leo nói: "can we look at the puppies first?" (mấy chú cún con trước).',
        transcriptClue: 'Dad, can we look at the puppies first?'
      },
      {
        id: 'q4-2',
        type: 'multiple_choice',
        prompt: 'What color are Toby\'s paws?',
        promptVi: 'Các bàn chân của chú cún Toby có màu gì?',
        options: [
          { id: 'opt-a', text: 'Black' },
          { id: 'opt-b', text: 'Brown' },
          { id: 'opt-c', text: 'White' },
          { id: 'opt-d', text: 'Grey' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Dad points out: "the little black puppy with white paws".',
        explanationVi: 'Bố miêu tả: "black puppy with white paws" (chân màu trắng).',
        transcriptClue: 'Look at the little black puppy with white paws over there.'
      },
      {
        id: 'q4-3',
        type: 'fill_in_blank',
        prompt: 'What is the puppy\'s name?',
        promptVi: 'Tên của chú cún là gì? (Điền 1 từ)',
        correctAnswer: 'Toby',
        acceptableAnswers: ['Toby', 'toby'],
        explanation: 'Dad reads: "His name is Toby."',
        explanationVi: 'Bố đọc: "His name is Toby".',
        transcriptClue: 'His name is Toby. He is three months old'
      },
      {
        id: 'q4-4',
        type: 'multiple_choice',
        prompt: 'How old is Toby?',
        promptVi: 'Chú cún Toby được bao nhiêu tháng tuổi?',
        options: [
          { id: 'opt-a', text: 'Two months old' },
          { id: 'opt-b', text: 'Three months old' },
          { id: 'opt-c', text: 'Four months old' },
          { id: 'opt-d', text: 'Six months old' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Dad says: "He is three months old".',
        explanationVi: 'Bố nói: "He is three months old" (Ba tháng tuổi).',
        transcriptClue: 'He is three months old and loves playing with rubber balls.'
      },
      {
        id: 'q4-5',
        type: 'true_false',
        prompt: 'Toby likes playing with rubber balls.',
        promptVi: 'Toby rất thích chơi đùa với những quả bóng cao su.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'true',
        explanation: 'True. Dad states: "and loves playing with rubber balls."',
        explanationVi: 'Đúng. Bố nói chú cún rất thích chơi bóng cao su ("loves playing with rubber balls").',
        transcriptClue: 'and loves playing with rubber balls.'
      }
    ]
  },
  {
    id: 'a1-test-05',
    level: 'A1',
    title: 'Birthday Party Invitation',
    vietnameseTitle: 'Lời mời dự tiệc sinh nhật',
    topic: 'Celebrations',
    topicVi: 'Lễ hội & Sinh nhật',
    difficulty: 'Trung bình',
    estimatedMinutes: 6,
    description: 'Listen to Lucy inviting her classmate Sam to her 10th birthday party on Saturday.',
    descriptionVi: 'Nghe bạn Lucy mời bạn cùng lớp Sam đến dự sinh nhật tròn 10 tuổi vào thứ Bảy.',
    vocabulary: [
      {
        word: 'invitation',
        ipa: '/ˌɪnvɪˈteɪʃn/',
        meaning: 'thiệp mời, lời mời',
        example: 'Here is your colorful invitation card.',
        exampleVi: 'Đây là tấm thiệp mời rực rỡ của bạn.'
      },
      {
        word: 'backyard',
        ipa: '/ˌbækˈjɑːd/',
        meaning: 'sân sau nhà',
        example: 'We will set up party tents in the backyard.',
        exampleVi: 'Chúng mình sẽ dựng lều tiệc ở sân sau.'
      },
      {
        word: 'costume',
        ipa: '/ˈkɒstjuːm/',
        meaning: 'trang phục hóa trang',
        example: 'You can wear a superhero costume.',
        exampleVi: 'Bạn có thể mặc trang phục siêu anh hùng.'
      }
    ],
    transcripts: [
      {
        id: 't5-1',
        speaker: 'Lucy',
        text: 'Hi Sam! Are you free this Saturday afternoon?',
        viText: 'Chào Sam! Chiều thứ Bảy tuần này cậu có rảnh không?'
      },
      {
        id: 't5-2',
        speaker: 'Sam',
        text: 'Hi Lucy! Yes, I don\'t have any football practice. What\'s happening?',
        viText: 'Chào Lucy! Có chứ, mình không có lịch tập đá bóng. Có chuyện gì vui thế?'
      },
      {
        id: 't5-3',
        speaker: 'Lucy',
        text: 'It\'s my tenth birthday! I am having a party at my house from three o\'clock until six in the evening.',
        viText: 'Sinh nhật 10 tuổi của mình đấy! Mình tổ chức tiệc tại nhà từ 3 giờ đến 6 giờ chiều.'
      },
      {
        id: 't5-4',
        speaker: 'Sam',
        text: 'Awesome! What games are we going to play?',
        viText: 'Tuyệt quá! Chúng mình sẽ chơi những trò chơi gì vậy?'
      },
      {
        id: 't5-5',
        speaker: 'Lucy',
        text: 'We will play musical chairs and treasure hunt in the garden. And my mum is baking a big chocolate cake!',
        viText: 'Chúng mình sẽ chơi trò bịt mắt giành ghế và tìm kho báu trong vườn. Mẹ mình còn nướng một chiếc bánh kem sô-cô-la to nữa!'
      }
    ],
    questions: [
      {
        id: 'q5-1',
        type: 'multiple_choice',
        prompt: 'On which day of the week is Lucy\'s party?',
        promptVi: 'Bữa tiệc sinh nhật của Lucy diễn ra vào thứ mấy?',
        options: [
          { id: 'opt-a', text: 'Friday' },
          { id: 'opt-b', text: 'Saturday' },
          { id: 'opt-c', text: 'Sunday' },
          { id: 'opt-d', text: 'Monday' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Lucy asks: "Are you free this Saturday afternoon?"',
        explanationVi: 'Lucy hỏi: "Are you free this Saturday afternoon?" (Chiều thứ Bảy).',
        transcriptClue: 'Are you free this Saturday afternoon?'
      },
      {
        id: 'q5-2',
        type: 'fill_in_blank',
        prompt: 'How old is Lucy turning?',
        promptVi: 'Lucy mừng sinh nhật tròn bao nhiêu tuổi? (Điền số hoặc chữ)',
        correctAnswer: '10',
        acceptableAnswers: ['10', 'ten', 'tenth'],
        explanation: 'Lucy says: "It\'s my tenth birthday!"',
        explanationVi: 'Lucy nói: "It\'s my tenth birthday!" (Mười tuổi).',
        transcriptClue: 'It\'s my tenth birthday!'
      },
      {
        id: 'q5-3',
        type: 'multiple_choice',
        prompt: 'What time does the party start?',
        promptVi: 'Bữa tiệc bắt đầu lúc mấy giờ?',
        options: [
          { id: 'opt-a', text: '2:00 PM' },
          { id: 'opt-b', text: '3:00 PM' },
          { id: 'opt-c', text: '4:00 PM' },
          { id: 'opt-d', text: '6:00 PM' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Lucy states: "from three o\'clock until six in the evening."',
        explanationVi: 'Lucy cho biết tiệc bắt đầu từ 3 giờ chiều ("from three o\'clock").',
        transcriptClue: 'from three o\'clock until six in the evening.'
      },
      {
        id: 'q5-4',
        type: 'multiple_choice',
        prompt: 'What flavor is the birthday cake Lucy\'s mum is baking?',
        promptVi: 'Chiếc bánh sinh nhật mẹ Lucy nướng có vị gì?',
        options: [
          { id: 'opt-a', text: 'Vanilla' },
          { id: 'opt-b', text: 'Strawberry' },
          { id: 'opt-c', text: 'Chocolate' },
          { id: 'opt-d', text: 'Lemon' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Lucy mentions: "my mum is baking a big chocolate cake!"',
        explanationVi: 'Lucy nói: "a big chocolate cake" (bánh sô-cô-la lớn).',
        transcriptClue: 'And my mum is baking a big chocolate cake!'
      },
      {
        id: 'q5-5',
        type: 'true_false',
        prompt: 'Sam cannot go because he has football practice.',
        promptVi: 'Sam không thể đi vì bạn ấy bận lịch tập bóng đá.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Sam says: "I don\'t have any football practice."',
        explanationVi: 'Sai. Sam trả lời: "I don\'t have any football practice" nghĩa là bạn ấy không có lịch tập, đi được.',
        transcriptClue: 'Yes, I don\'t have any football practice.'
      }
    ]
  },

  // ================= A2 TESTS =================
  {
    id: 'a2-test-01',
    level: 'A2',
    title: 'Directions in the City & Bus Travel',
    vietnameseTitle: 'Chỉ đường trong thành phố & Đi xe buýt',
    topic: 'Directions & Transport',
    topicVi: 'Chỉ đường & Phương tiện',
    difficulty: 'Trung bình',
    estimatedMinutes: 7,
    description: 'Listen to a visitor asking a local resident for directions to the Central City Library and bus route.',
    descriptionVi: 'Nghe khách tham quan hỏi người dân địa phương đường đến Thư viện Trung tâm thành phố và tuyến xe buýt.',
    vocabulary: [
      {
        word: 'crossroads',
        ipa: '/ˈkrɒsrəʊdz/',
        meaning: 'ngã tư đường',
        example: 'Turn left when you reach the busy crossroads.',
        exampleVi: 'Rẽ trái khi bạn đến ngã tư đông đúc.'
      },
      {
        word: 'opposite',
        ipa: '/ˈɒpəzɪt/',
        meaning: 'đối diện',
        example: 'The library is directly opposite the post office.',
        exampleVi: 'Thư viện nằm ngay đối diện bưu điện.'
      },
      {
        word: 'single ticket',
        ipa: '/ˌsɪŋɡl ˈtɪkɪt/',
        meaning: 'vé một chiều',
        example: 'A single ticket costs one pound fifty pence.',
        exampleVi: 'Một vé một chiều có giá 1 bảng 50 xu.'
      },
      {
        word: 'pedestrian crossing',
        ipa: '/pəˌdestriən ˈkrɒsɪŋ/',
        meaning: 'vạch sang đường cho người đi bộ',
        example: 'Use the pedestrian crossing near the traffic lights.',
        exampleVi: 'Hãy dùng vạch sang đường gần cột đèn giao thông.'
      }
    ],
    transcripts: [
      {
        id: 't6-1',
        speaker: 'Tourist (Mark)',
        text: 'Excuse me! Could you tell me how to get to the Central Library from here?',
        viText: 'Xin lỗi bạn! Bạn có thể chỉ giúp tôi đường đến Thư viện Trung tâm từ đây không?'
      },
      {
        id: 't6-2',
        speaker: 'Local (Claire)',
        text: 'Certainly! Walk straight down King\'s Street until you reach the traffic lights at the big crossroads.',
        viText: 'Dạ được chứ! Bạn cứ đi thẳng đường King\'s Street cho đến khi thấy đèn tín hiệu ở ngã tư lớn.'
      },
      {
        id: 't6-3',
        speaker: 'Local (Claire)',
        text: 'Turn left into Elm Avenue. Walk past the bakery and the bank. The library is on your right, opposite the city park.',
        viText: 'Sau đó rẽ trái vào Đại lộ Elm. Đi qua tiệm bánh và ngân hàng. Thư viện sẽ nằm bên tay phải của bạn, đối diện công viên thành phố.'
      },
      {
        id: 't6-4',
        speaker: 'Tourist (Mark)',
        text: 'Is it far? Should I take the bus if I am carrying heavy bags?',
        viText: 'Có xa lắm không bạn? Tôi có nên đi xe buýt nếu đang xách túi nặng không?'
      },
      {
        id: 't6-5',
        speaker: 'Local (Claire)',
        text: 'It takes about fifteen minutes to walk. Or you can take bus number forty-two from that shelter. It drops you right at the entrance in five minutes.',
        viText: 'Đi bộ mất khoảng mười lăm phút. Hoặc bạn có thể bắt xe buýt số 42 ở nhà chờ đằng kia. Xe sẽ thả bạn ngay cổng thư viện chỉ sau 5 phút.'
      }
    ],
    questions: [
      {
        id: 'q6-1',
        type: 'multiple_choice',
        prompt: 'What street should the tourist walk down first?',
        promptVi: 'Người khách du lịch nên đi thẳng con đường nào đầu tiên?',
        options: [
          { id: 'opt-a', text: 'Elm Avenue' },
          { id: 'opt-b', text: 'King\'s Street' },
          { id: 'opt-c', text: 'Green Road' },
          { id: 'opt-d', text: 'Church Lane' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Claire advises: "Walk straight down King\'s Street until you reach the traffic lights."',
        explanationVi: 'Claire hướng dẫn: "Walk straight down King\'s Street" (Đi thẳng đường King\'s Street).',
        transcriptClue: 'Walk straight down King\'s Street until you reach the traffic lights'
      },
      {
        id: 'q6-2',
        type: 'multiple_choice',
        prompt: 'Where is the library located?',
        promptVi: 'Thư viện nằm ở vị trí nào?',
        options: [
          { id: 'opt-a', text: 'Next to the bakery' },
          { id: 'opt-b', text: 'Opposite the city park' },
          { id: 'opt-c', text: 'Behind the church' },
          { id: 'opt-d', text: 'Inside the train station' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Claire states: "The library is on your right, opposite the city park."',
        explanationVi: 'Claire nói: "opposite the city park" (đối diện công viên thành phố).',
        transcriptClue: 'The library is on your right, opposite the city park.'
      },
      {
        id: 'q6-3',
        type: 'fill_in_blank',
        prompt: 'Which bus number goes directly to the library entrance?',
        promptVi: 'Tuyến xe buýt số bao nhiêu đi thẳng tới cổng thư viện? (Điền số)',
        correctAnswer: '42',
        acceptableAnswers: ['42', 'forty-two', 'forty two', 'bus 42'],
        explanation: 'Claire says: "you can take bus number forty-two".',
        explanationVi: 'Claire bảo: "bus number forty-two" (xe buýt số 42).',
        transcriptClue: 'Or you can take bus number forty-two from that shelter.'
      },
      {
        id: 'q6-4',
        type: 'multiple_choice',
        prompt: 'How long does it take to walk to the library?',
        promptVi: 'Mất bao lâu nếu đi bộ đến thư viện?',
        options: [
          { id: 'opt-a', text: '5 minutes' },
          { id: 'opt-b', text: '10 minutes' },
          { id: 'opt-c', text: '15 minutes' },
          { id: 'opt-d', text: '30 minutes' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Claire says: "It takes about fifteen minutes to walk."',
        explanationVi: 'Claire cho biết: "about fifteen minutes to walk" (khoảng 15 phút).',
        transcriptClue: 'It takes about fifteen minutes to walk.'
      },
      {
        id: 'q6-5',
        type: 'true_false',
        prompt: 'The tourist must turn right into Elm Avenue at the crossroads.',
        promptVi: 'Khách du lịch phải rẽ phải vào Đại lộ Elm tại ngã tư.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Claire says: "Turn left into Elm Avenue."',
        explanationVi: 'Sai. Claire chỉ rõ: "Turn left into Elm Avenue" (Rẽ trái, không phải rẽ phải).',
        transcriptClue: 'Turn left into Elm Avenue. Walk past the bakery and the bank.'
      }
    ]
  },
  {
    id: 'a2-test-02',
    level: 'A2',
    title: 'A Visit to the Doctor & Healthy Advice',
    vietnameseTitle: 'Khám bác sĩ & Lời khuyên sức khỏe',
    topic: 'Health & Medicine',
    topicVi: 'Sức khỏe & Y tế',
    difficulty: 'Khá',
    estimatedMinutes: 7,
    description: 'Listen to a teenage patient discussing symptoms of a sore throat and fever with Dr. Wilson.',
    descriptionVi: 'Nghe cuộc đối thoại giữa bạn học sinh bị viêm họng, sốt nhẹ với bác sĩ Wilson.',
    vocabulary: [
      {
        word: 'sore throat',
        ipa: '/ˌsɔː ˈθrəʊt/',
        meaning: 'đau họng, viêm họng',
        example: 'Drinking warm lemon honey tea helps a sore throat.',
        exampleVi: 'Uống trà chanh mật ong ấm giúp làm dịu cơn đau họng.'
      },
      {
        word: 'temperature',
        ipa: '/ˈtemprətʃə(r)/',
        meaning: 'nhiệt độ cơ thể, sốt',
        example: 'Let me measure your body temperature.',
        exampleVi: 'Để bác đo nhiệt độ cơ thể cho cháu nhé.'
      },
      {
        word: 'prescription',
        ipa: '/prɪˈskrɪpʃn/',
        meaning: 'đơn thuốc',
        example: 'Take this prescription to the local pharmacy.',
        exampleVi: 'Hãy mang đơn thuốc này tới hiệu thuốc địa phương.'
      },
      {
        word: 'tablet / pill',
        ipa: '/ˈtæblət/',
        meaning: 'viên thuốc',
        example: 'Take one tablet after each meal.',
        exampleVi: 'Uống một viên thuốc sau mỗi bữa ăn.'
      }
    ],
    transcripts: [
      {
        id: 't7-1',
        speaker: 'Dr. Wilson',
        text: 'Good morning, Daniel. Sit down please. What seems to be the problem today?',
        viText: 'Chào Daniel. Mời cháu ngồi. Hôm nay cháu cảm thấy không khỏe ở đâu nào?'
      },
      {
        id: 't7-2',
        speaker: 'Daniel',
        text: 'Good morning, Doctor. I have had a bad headache and a sore throat since yesterday evening.',
        viText: 'Cháu chào bác sĩ. Cháu bị đau đầu nhiều và rát cổ họng từ tối hôm qua ạ.'
      },
      {
        id: 't7-3',
        speaker: 'Dr. Wilson',
        text: 'Let me take a look at your throat. Yes, it looks quite red. Now let\'s check your temperature... It is thirty-eight degrees, which is a mild fever.',
        viText: 'Để bác kiểm tra họng của cháu nhé. Đúng rồi, họng hơi sưng đỏ. Giờ bác đo nhiệt độ nào... 38 độ C, cháu đang bị sốt nhẹ.'
      },
      {
        id: 't7-4',
        speaker: 'Daniel',
        text: 'Can I go to school tomorrow? We have a swimming competition.',
        viText: 'Ngày mai cháu có thể đi học được không ạ? Lớp cháu có cuộc thi bơi lội.'
      },
      {
        id: 't7-5',
        speaker: 'Dr. Wilson',
        text: 'No swimming this week, Daniel. You need to rest at home for two days, drink plenty of warm water, and take this syrup three times a day after meals.',
        viText: 'Tuần này không được đi bơi nhé Daniel. Cháu cần nghỉ ngơi ở nhà 2 ngày, uống nhiều nước ấm và uống siro này ba lần mỗi ngày sau bữa ăn.'
      }
    ],
    questions: [
      {
        id: 'q7-1',
        type: 'multiple_choice',
        prompt: 'When did Daniel\'s symptoms start?',
        promptVi: 'Triệu chứng của Daniel bắt đầu từ lúc nào?',
        options: [
          { id: 'opt-a', text: 'Three days ago' },
          { id: 'opt-b', text: 'Yesterday morning' },
          { id: 'opt-c', text: 'Yesterday evening' },
          { id: 'opt-d', text: 'This morning' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Daniel mentions: "since yesterday evening."',
        explanationVi: 'Daniel nói: "since yesterday evening" (từ tối hôm qua).',
        transcriptClue: 'I have had a bad headache and a sore throat since yesterday evening.'
      },
      {
        id: 'q7-2',
        type: 'fill_in_blank',
        prompt: 'What was Daniel\'s body temperature in degrees Celsius?',
        promptVi: 'Nhiệt độ cơ thể của Daniel là bao nhiêu độ C? (Điền số)',
        correctAnswer: '38',
        acceptableAnswers: ['38', '38 degrees', 'thirty-eight', '38°C'],
        explanation: 'The doctor notes: "It is thirty-eight degrees, which is a mild fever."',
        explanationVi: 'Bác sĩ đo được: "thirty-eight degrees" (38 độ).',
        transcriptClue: 'It is thirty-eight degrees, which is a mild fever.'
      },
      {
        id: 'q7-3',
        type: 'multiple_choice',
        prompt: 'How many times a day should Daniel take the syrup?',
        promptVi: 'Daniel cần uống siro thuốc mấy lần một ngày?',
        options: [
          { id: 'opt-a', text: 'Once before bed' },
          { id: 'opt-b', text: 'Two times before meals' },
          { id: 'opt-c', text: 'Three times a day after meals' },
          { id: 'opt-d', text: 'Four times every six hours' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Dr. Wilson instructs: "take this syrup three times a day after meals."',
        explanationVi: 'Bác sĩ dặn: "three times a day after meals" (ba lần mỗi ngày sau bữa ăn).',
        transcriptClue: 'and take this syrup three times a day after meals.'
      },
      {
        id: 'q7-4',
        type: 'true_false',
        prompt: 'Dr. Wilson allows Daniel to join the swimming competition tomorrow.',
        promptVi: 'Bác sĩ Wilson cho phép Daniel tham gia cuộc thi bơi lội ngày mai.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Dr. Wilson strictly says: "No swimming this week, Daniel."',
        explanationVi: 'Sai. Bác sĩ nghiêm túc dặn: "No swimming this week" (Không được đi bơi tuần này).',
        transcriptClue: 'No swimming this week, Daniel. You need to rest at home for two days'
      },
      {
        id: 'q7-5',
        type: 'multiple_choice',
        prompt: 'How many days does Daniel need to rest at home?',
        promptVi: 'Daniel cần nghỉ ngơi ở nhà bao nhiêu ngày?',
        options: [
          { id: 'opt-a', text: 'One day' },
          { id: 'opt-b', text: 'Two days' },
          { id: 'opt-c', text: 'Five days' },
          { id: 'opt-d', text: 'A full week' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Dr. Wilson says: "You need to rest at home for two days".',
        explanationVi: 'Bác sĩ nói: "rest at home for two days" (nghỉ ngơi ở nhà hai ngày).',
        transcriptClue: 'You need to rest at home for two days'
      }
    ]
  },
  {
    id: 'a2-test-03',
    level: 'A2',
    title: 'School Excursion to the Science Museum',
    vietnameseTitle: 'Chuyến dã ngoại trường tới Bảo tàng Khoa học',
    topic: 'School Excursions',
    topicVi: 'Hoạt động dã ngoại',
    difficulty: 'Trung bình',
    estimatedMinutes: 7,
    description: 'Listen to a teacher giving instructions to students before a school trip to the museum.',
    descriptionVi: 'Nghe cô giáo dặn dò học sinh trước chuyến đi thực tế tới bảo tàng khoa học.',
    vocabulary: [
      {
        word: 'excursion / trip',
        ipa: '/ɪkˈskɜːʃn/',
        meaning: 'chuyến dã ngoại, tham quan học tập',
        example: 'Our annual school excursion is next Wednesday.',
        exampleVi: 'Chuyến tham quan hàng năm của trường là vào thứ Tư tới.'
      },
      {
        word: 'packed lunch',
        ipa: '/ˌpækt ˈlʌntʃ/',
        meaning: 'bữa trưa mang theo (cơm hộp/bánh)',
        example: 'Students should bring a healthy packed lunch.',
        exampleVi: 'Học sinh nên mang theo bữa trưa chuẩn bị sẵn đầy đủ dinh dưỡng.'
      },
      {
        word: 'meeting point',
        ipa: '/ˈmiːtɪŋ pɔɪnt/',
        meaning: 'điểm tập trung',
        example: 'Wait at the main gate meeting point at three o\'clock.',
        exampleVi: 'Hãy đợi tại điểm hẹn cổng chính lúc 3 giờ.'
      }
    ],
    transcripts: [
      {
        id: 't8-1',
        speaker: 'Teacher (Mr. Harrison)',
        text: 'Attention please, year eight students! Here is the final schedule for our excursion to the Science Museum this Friday.',
        viText: 'Xin cả lớp chú ý! Đây là lịch trình chi tiết cho chuyến dã ngoại tới Bảo tàng Khoa học vào thứ Sáu tuần này.'
      },
      {
        id: 't8-2',
        speaker: 'Teacher (Mr. Harrison)',
        text: 'The buses will leave the school gate promptly at eight forty-five in the morning, so you must arrive before eight thirty.',
        viText: 'Xe buýt sẽ rời cổng trường đúng 8 giờ 45 phút sáng, vì thế các em phải có mặt trước 8 giờ 30 nhé.'
      },
      {
        id: 't8-3',
        speaker: 'Teacher (Mr. Harrison)',
        text: 'The museum ticket is already paid, but please bring a packed lunch and a refillable bottle of water.',
        viText: 'Vé vào bảo tàng đã được thanh toán, nhưng các em hãy tự chuẩn bị đồ ăn trưa và bình nước uống có thể châm thêm.'
      },
      {
        id: 't8-4',
        speaker: 'Teacher (Mr. Harrison)',
        text: 'Remember, inside the Space Gallery, taking photos with flash is strictly prohibited.',
        viText: 'Lưu ý, bên trong Phòng trưng bày Vũ trụ, việc chụp ảnh bật đèn flash bị nghiêm cấm hoàn toàn.'
      },
      {
        id: 't8-5',
        speaker: 'Teacher (Mr. Harrison)',
        text: 'We will meet near the dinosaur skeleton at two o\'clock before boarding our buses back to school.',
        viText: 'Chúng ta sẽ tập trung gần bộ xương khủng long lúc 2 giờ chiều trước khi lên xe buýt về trường.'
      }
    ],
    questions: [
      {
        id: 'q8-1',
        type: 'multiple_choice',
        prompt: 'What time must students arrive at school on Friday?',
        promptVi: 'Học sinh phải có mặt tại trường trước mấy giờ vào thứ Sáu?',
        options: [
          { id: 'opt-a', text: 'Before 8:00 AM' },
          { id: 'opt-b', text: 'Before 8:30 AM' },
          { id: 'opt-c', text: 'At 8:45 AM' },
          { id: 'opt-d', text: 'At 9:00 AM' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Mr. Harrison states: "so you must arrive before eight thirty."',
        explanationVi: 'Thầy Harrison nhắc: "you must arrive before eight thirty" (trước 8:30 sáng).',
        transcriptClue: 'so you must arrive before eight thirty.'
      },
      {
        id: 'q8-2',
        type: 'multiple_choice',
        prompt: 'What are students asked to bring with them?',
        promptVi: 'Học sinh được yêu cầu mang theo những gì?',
        options: [
          { id: 'opt-a', text: 'Money for the entrance ticket' },
          { id: 'opt-b', text: 'A packed lunch and a refillable water bottle' },
          { id: 'opt-c', text: 'A heavy science textbook' },
          { id: 'opt-d', text: 'A flash camera' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Mr. Harrison says: "please bring a packed lunch and a refillable bottle of water."',
        explanationVi: 'Thầy dặn: "packed lunch and a refillable bottle of water" (bữa trưa mang theo và bình nước).',
        transcriptClue: 'please bring a packed lunch and a refillable bottle of water.'
      },
      {
        id: 'q8-3',
        type: 'true_false',
        prompt: 'Students are allowed to use flash photography inside the Space Gallery.',
        promptVi: 'Học sinh được phép chụp ảnh có bật flash bên trong Phòng trưng bày Vũ trụ.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Taking photos with flash is strictly prohibited.',
        explanationVi: 'Sai. Thầy dặn rõ: "taking photos with flash is strictly prohibited" (nghiêm cấm chụp flash).',
        transcriptClue: 'taking photos with flash is strictly prohibited.'
      },
      {
        id: 'q8-4',
        type: 'fill_in_blank',
        prompt: 'Where is the afternoon meeting point before heading back?',
        promptVi: 'Điểm tập trung buổi chiều trước khi lên xe về là ở đâu? (Gợi ý: dinosaur ...)',
        correctAnswer: 'dinosaur skeleton',
        acceptableAnswers: ['dinosaur skeleton', 'near the dinosaur', 'dinosaur', 'dinosaur exhibit'],
        explanation: 'Mr. Harrison says: "We will meet near the dinosaur skeleton at two o\'clock."',
        explanationVi: 'Thầy thông báo: "near the dinosaur skeleton" (gần bộ xương khủng long).',
        transcriptClue: 'We will meet near the dinosaur skeleton at two o\'clock'
      },
      {
        id: 'q8-5',
        type: 'multiple_choice',
        prompt: 'What time does the bus leave the school?',
        promptVi: 'Mấy giờ xe buýt rời trường?',
        options: [
          { id: 'opt-a', text: '8:30 AM' },
          { id: 'opt-b', text: '8:45 AM' },
          { id: 'opt-c', text: '9:15 AM' },
          { id: 'opt-d', text: '2:00 PM' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Mr. Harrison says: "The buses will leave the school gate promptly at eight forty-five".',
        explanationVi: 'Thầy nói xe xuất phát đúng 8:45 sáng ("eight forty-five").',
        transcriptClue: 'The buses will leave the school gate promptly at eight forty-five'
      }
    ]
  },
  {
    id: 'a2-test-04',
    level: 'A2',
    title: 'Weekend Sports Club & Fitness',
    vietnameseTitle: 'Câu lạc bộ Thể thao cuối tuần',
    topic: 'Sports & Hobbies',
    topicVi: 'Thể thao & Sở thích',
    difficulty: 'Trung bình',
    estimatedMinutes: 6,
    description: 'Listen to an inquiry about joining the junior tennis and badminton club on weekends.',
    descriptionVi: 'Nghe cuộc hỏi thông tin đăng ký tham gia câu lạc bộ quần vợt và cầu lông thiếu niên.',
    vocabulary: [
      {
        word: 'membership',
        ipa: '/ˈmembəʃɪp/',
        meaning: 'thẻ thành viên, tư cách hội viên',
        example: 'A student membership gives you 50% discount.',
        exampleVi: 'Thẻ thành viên học sinh giúp bạn được giảm giá 50%.'
      },
      {
        word: 'racket',
        ipa: '/ˈrækɪt/',
        meaning: 'vợt (cầu lông, tennis)',
        example: 'You can rent a badminton racket for two dollars.',
        exampleVi: 'Bạn có thể thuê một chiếc vợt cầu lông với giá hai đô.'
      },
      {
        word: 'coach',
        ipa: '/kəʊtʃ/',
        meaning: 'huấn luyện viên',
        example: 'The coach gives helpful tips on serving.',
        exampleVi: 'Huấn luyện viên đưa ra những lời khuyên hữu ích về kỹ thuật giao cầu.'
      }
    ],
    transcripts: [
      {
        id: 't9-1',
        speaker: 'Club Receptionist',
        text: 'Good afternoon, Riverside Sports Club! How may I assist you?',
        viText: 'Xin chào, Câu lạc bộ Thể thao Riverside xin nghe! Tôi có thể giúp gì cho bạn?'
      },
      {
        id: 't9-2',
        speaker: 'Student (Jessica)',
        text: 'Hello. I would like some information about your junior badminton sessions on Saturdays.',
        viText: 'Dạ chào cô. Cháu muốn hỏi thông tin về các buổi tập cầu lông thiếu niên vào thứ Bảy ạ.'
      },
      {
        id: 't9-3',
        speaker: 'Club Receptionist',
        text: 'Certainly! Our junior badminton club runs every Saturday from ten in the morning until noon. It is open for players aged ten to sixteen.',
        viText: 'Được chứ cháu! Câu lạc bộ cầu lông thiếu niên sinh hoạt vào mỗi thứ Bảy từ 10 giờ sáng đến 12 giờ trưa. Dành cho lứa tuổi từ 10 đến 16.'
      },
      {
        id: 't9-4',
        speaker: 'Student (Jessica)',
        text: 'Do I need to bring my own equipment?',
        viText: 'Cháu có cần tự mang dụng cụ đi không ạ?'
      },
      {
        id: 't9-5',
        speaker: 'Club Receptionist',
        text: 'You just need clean sports shoes. We provide rackets and shuttlecocks free for all club members. The monthly fee is only twenty pounds.',
        viText: 'Cháu chỉ cần mang giày thể thao sạch. Câu lạc bộ cung cấp vợt và quả cầu lông miễn phí cho hội viên. Học phí mỗi tháng chỉ 20 bảng thôi.'
      }
    ],
    questions: [
      {
        id: 'q9-1',
        type: 'multiple_choice',
        prompt: 'What sport is Jessica inquiring about?',
        promptVi: 'Jessica đang tìm hiểu về môn thể thao nào?',
        options: [
          { id: 'opt-a', text: 'Tennis' },
          { id: 'opt-b', text: 'Badminton' },
          { id: 'opt-c', text: 'Swimming' },
          { id: 'opt-d', text: 'Volleyball' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Jessica asks: "information about your junior badminton sessions on Saturdays."',
        explanationVi: 'Jessica hỏi về môn cầu lông: "junior badminton sessions".',
        transcriptClue: 'information about your junior badminton sessions on Saturdays.'
      },
      {
        id: 'q9-2',
        type: 'multiple_choice',
        prompt: 'What age group is eligible for the junior club?',
        promptVi: 'Độ tuổi nào đủ điều kiện tham gia câu lạc bộ thiếu niên?',
        options: [
          { id: 'opt-a', text: 'Under 10 years old' },
          { id: 'opt-b', text: 'Aged 10 to 16' },
          { id: 'opt-c', text: 'Aged 16 to 20' },
          { id: 'opt-d', text: 'All adults' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The receptionist says: "It is open for players aged ten to sixteen."',
        explanationVi: 'Người tiếp tân nói: "players aged ten to sixteen" (từ 10 đến 16 tuổi).',
        transcriptClue: 'It is open for players aged ten to sixteen.'
      },
      {
        id: 'q9-3',
        type: 'fill_in_blank',
        prompt: 'What is the monthly membership fee in pounds?',
        promptVi: 'Học phí thành viên mỗi tháng là bao nhiêu bảng? (Điền số: 20 hoặc chữ: twenty)',
        correctAnswer: '20',
        acceptableAnswers: ['20', 'twenty', '£20', '20 pounds'],
        explanation: 'The receptionist states: "The monthly fee is only twenty pounds."',
        explanationVi: 'Học phí được thông báo là 20 bảng: "twenty pounds".',
        transcriptClue: 'The monthly fee is only twenty pounds.'
      },
      {
        id: 'q9-4',
        type: 'true_false',
        prompt: 'Members have to pay extra money to borrow rackets and shuttlecocks.',
        promptVi: 'Hội viên phải trả thêm tiền để mượn vợt và quả cầu lông.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. The receptionist confirms: "We provide rackets and shuttlecocks free for all club members."',
        explanationVi: 'Sai. Người tiếp tân khẳng định cung cấp miễn phí cho hội viên ("free for all club members").',
        transcriptClue: 'We provide rackets and shuttlecocks free for all club members.'
      },
      {
        id: 'q9-5',
        type: 'multiple_choice',
        prompt: 'What must Jessica bring to the club sessions?',
        promptVi: 'Jessica cần phải mang theo thứ gì khi đến buổi tập?',
        options: [
          { id: 'opt-a', text: 'Her own badminton racket' },
          { id: 'opt-b', text: 'Clean sports shoes' },
          { id: 'opt-c', text: 'A doctor certificate' },
          { id: 'opt-d', text: 'Ten shuttlecocks' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The receptionist says: "You just need clean sports shoes."',
        explanationVi: 'Người tiếp tân nói: "You just need clean sports shoes" (chỉ cần giày thể thao sạch).',
        transcriptClue: 'You just need clean sports shoes.'
      }
    ]
  },
  {
    id: 'a2-test-05',
    level: 'A2',
    title: 'Airport & Travel Announcements',
    vietnameseTitle: 'Thông báo sân bay & Du lịch',
    topic: 'Travel & Transport',
    topicVi: 'Du lịch & Sân bay',
    difficulty: 'Khá',
    estimatedMinutes: 7,
    description: 'Listen to public airport announcements regarding gate changes, boarding times, and lost luggage.',
    descriptionVi: 'Nghe các thông báo phát thanh tại sân bay về thay đổi cửa lên máy bay, thời gian khởi hành và hành lý.',
    vocabulary: [
      {
        word: 'boarding gate',
        ipa: '/ˈbɔːdɪŋ ɡeɪt/',
        meaning: 'cửa lên máy bay',
        example: 'Passengers for flight VN302, please proceed to boarding gate B14.',
        exampleVi: 'Hành khách chuyến bay VN302 vui lòng di chuyển đến cửa ra máy bay B14.'
      },
      {
        word: 'delayed',
        ipa: '/dɪˈleɪd/',
        meaning: 'bị trễ, hoãn chuyến',
        example: 'The flight has been delayed by thirty minutes due to fog.',
        exampleVi: 'Chuyến bay bị hoãn 30 phút vì sương mù.'
      },
      {
        word: 'unattended',
        ipa: '/ˌʌnəˈtendɪd/',
        meaning: 'không có người trông coi',
        example: 'Do not leave your personal bags unattended.',
        exampleVi: 'Không được để hành lý cá nhân mà không có người trông giữ.'
      }
    ],
    transcripts: [
      {
        id: 't10-1',
        speaker: 'Airport Announcer',
        text: 'Good afternoon, passengers. This is an urgent announcement for all travellers on British Airways flight BA seven-two-four to Paris.',
        viText: 'Kính chào quý hành khách. Đây là thông báo khẩn dành cho hành khách trên chuyến bay British Airways BA 724 đi Paris.'
      },
      {
        id: 't10-2',
        speaker: 'Airport Announcer',
        text: 'Due to routine maintenance on the runway, the departure time is now rescheduled to five thirty PM.',
        viText: 'Do công tác bảo trì định kỳ trên đường băng, giờ khởi hành mới được lùi lại đến 5 giờ 30 phút chiều.'
      },
      {
        id: 't10-3',
        speaker: 'Airport Announcer',
        text: 'Additionally, the boarding gate has been moved from gate twelve to gate twenty-eight.',
        viText: 'Ngoài ra, cửa ra máy bay đã được chuyển từ cửa số 12 sang cửa số 28.'
      },
      {
        id: 't10-4',
        speaker: 'Airport Announcer',
        text: 'Passengers travelling with infants or needing extra assistance may begin boarding at five o\'clock.',
        viText: 'Hành khách đi cùng trẻ sơ sinh hoặc cần hỗ trợ đặc biệt có thể bắt đầu lên máy bay lúc 5 giờ đúng.'
      },
      {
        id: 't10-5',
        speaker: 'Airport Announcer',
        text: 'Please check the digital screens for further real-time updates. Thank you for your patience.',
        viText: 'Quý khách vui lòng theo dõi màn hình điện tử để cập nhật thông tin tiếp theo. Xin cảm ơn sự thông cảm của quý khách.'
      }
    ],
    questions: [
      {
        id: 'q10-1',
        type: 'multiple_choice',
        prompt: 'What is the flight number in the announcement?',
        promptVi: 'Số hiệu chuyến bay trong thông báo là gì?',
        options: [
          { id: 'opt-a', text: 'BA 247' },
          { id: 'opt-b', text: 'BA 724' },
          { id: 'opt-c', text: 'BA 742' },
          { id: 'opt-d', text: 'BA 530' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The announcer says: "British Airways flight BA seven-two-four".',
        explanationVi: 'Phát thanh viên đọc: "BA seven-two-four" (BA 724).',
        transcriptClue: 'British Airways flight BA seven-two-four to Paris.'
      },
      {
        id: 'q10-2',
        type: 'multiple_choice',
        prompt: 'Where is the flight traveling to?',
        promptVi: 'Chuyến bay này sẽ bay đến thành phố nào?',
        options: [
          { id: 'opt-a', text: 'London' },
          { id: 'opt-b', text: 'Rome' },
          { id: 'opt-c', text: 'Paris' },
          { id: 'opt-d', text: 'New York' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'The announcer clearly says: "to Paris."',
        explanationVi: 'Thông báo nêu điểm đến là: "to Paris" (Thủ đô Paris).',
        transcriptClue: 'flight BA seven-two-four to Paris.'
      },
      {
        id: 'q10-3',
        type: 'fill_in_blank',
        prompt: 'What is the NEW boarding gate number?',
        promptVi: 'Cửa ra máy bay MỚI là cửa số mấy? (Điền số)',
        correctAnswer: '28',
        acceptableAnswers: ['28', 'gate 28', 'twenty-eight', 'twenty eight'],
        explanation: 'The announcer says: "moved from gate twelve to gate twenty-eight."',
        explanationVi: 'Cửa mới được chuyển sang cổng 28: "gate twenty-eight".',
        transcriptClue: 'the boarding gate has been moved from gate twelve to gate twenty-eight.'
      },
      {
        id: 'q10-4',
        type: 'multiple_choice',
        prompt: 'What is the rescheduled departure time?',
        promptVi: 'Giờ khởi hành mới sau khi lùi lại là lúc mấy giờ?',
        options: [
          { id: 'opt-a', text: '5:00 PM' },
          { id: 'opt-b', text: '5:15 PM' },
          { id: 'opt-c', text: '5:30 PM' },
          { id: 'opt-d', text: '6:00 PM' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'The announcer says: "departure time is now rescheduled to five thirty PM."',
        explanationVi: 'Giờ bay mới là: "five thirty PM" (5:30 chiều).',
        transcriptClue: 'the departure time is now rescheduled to five thirty PM.'
      },
      {
        id: 'q10-5',
        type: 'true_false',
        prompt: 'Passengers with infants can board early at five o\'clock.',
        promptVi: 'Hành khách có con nhỏ có thể lên máy bay sớm lúc 5 giờ đúng.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'true',
        explanation: 'True. "Passengers travelling with infants or needing extra assistance may begin boarding at five o\'clock."',
        explanationVi: 'Đúng. Thông báo nêu rõ: "Passengers travelling with infants... may begin boarding at five o\'clock".',
        transcriptClue: 'Passengers travelling with infants or needing extra assistance may begin boarding at five o\'clock.'
      }
    ]
  },

  // ================= B1 TESTS (INTERMEDIATE) =================
  {
    id: 'b1-test-01',
    level: 'B1',
    title: 'School Recycling & Environmental Protection',
    vietnameseTitle: 'Bảo vệ môi trường & Dự án tái chế học đường',
    topic: 'Environment & Society',
    topicVi: 'Môi trường & Xã hội',
    difficulty: 'Khá',
    estimatedMinutes: 8,
    description: 'Listen to two student council members discussing their campus green campaign and waste reduction strategies.',
    descriptionVi: 'Nghe cuộc thảo luận giữa hai đại diện ban cán sự học sinh về chiến dịch trường học xanh và các biện pháp giảm thiểu rác thải nhựa.',
    vocabulary: [
      {
        word: 'initiative',
        ipa: '/ɪˈnɪʃətɪv/',
        meaning: 'sáng kiến, kế hoạch khởi xướng',
        example: 'Our school launched a new recycling initiative this semester.',
        exampleVi: 'Trường chúng ta đã phát động một sáng kiến tái chế mới trong học kỳ này.'
      },
      {
        word: 'biodegradable',
        ipa: '/ˌbaɪəʊdɪˈɡreɪdəbl/',
        meaning: 'có thể phân hủy sinh học',
        example: 'We should encourage the canteen to use biodegradable food containers.',
        exampleVi: 'Chúng ta nên khuyến khích căng tin dùng hộp đựng thức ăn có thể phân hủy sinh học.'
      },
      {
        word: 'contaminated',
        ipa: '/kənˈtæmɪneɪtɪd/',
        meaning: 'bị ô nhiễm, lẫn tạp chất',
        example: 'Paper recycling bins often get contaminated with food leftovers.',
        exampleVi: 'Các thùng rác tái chế giấy thường bị lẫn thức ăn thừa làm bẩn.'
      },
      {
        word: 'sustainable',
        ipa: '/səˈsteɪnəbl/',
        meaning: 'bền vững, thân thiện môi trường',
        example: 'Developing sustainable habits is essential for future generations.',
        exampleVi: 'Hình thành những thói quen bền vững là điều thiết yếu cho thế hệ tương lai.'
      }
    ],
    transcripts: [
      {
        id: 'tb1-1',
        speaker: 'Liam (Student Council)',
        text: 'Hi Sarah, thanks for meeting me today. We need to finalize the Green Campus Proposal before Thursday\'s faculty meeting.',
        viText: 'Chào Sarah, cảm ơn bạn đã gặp mình hôm nay. Chúng ta cần hoàn thiện Đề án Trường học Xanh trước cuộc họp giáo viên vào thứ Năm.'
      },
      {
        id: 'tb1-2',
        speaker: 'Sarah',
        text: 'Absolutely, Liam. I reviewed the waste audit results from last month. It turns out nearly forty percent of what students throw into ordinary rubbish bins could actually be recycled.',
        viText: 'Chắc chắn rồi Liam. Mình đã xem lại kết quả kiểm toán rác thải tháng trước. Hóa ra gần 40% những gì học sinh vứt vào thùng rác thông thường thực tế có thể tái chế được.'
      },
      {
        id: 'tb1-3',
        speaker: 'Liam',
        text: 'That is quite alarming! What seems to be the primary cause of this problem?',
        viText: 'Con số đó thật đáng báo động! Đâu là nguyên nhân chính dẫn đến vấn đề này vậy bạn?'
      },
      {
        id: 'tb1-4',
        speaker: 'Sarah',
        text: 'Lack of clear labelling. Students often get confused between compostable food boxes and regular plastic cups. In addition, when people toss half-empty milk cartons into paper bins, the whole batch becomes contaminated.',
        viText: 'Do thiếu nhãn phân loại rõ ràng. Học sinh thường nhầm lẫn giữa hộp đựng thức ăn hữu cơ và cốc nhựa thường. Ngoài ra, khi các bạn ném hộp sữa còn thừa vào thùng giấy, toàn bộ số giấy đó đều bị ướt và nhiễm bẩn.'
      },
      {
        id: 'tb1-5',
        speaker: 'Liam',
        text: 'I see. So our proposal should focus on two key actions: installing three-compartment colour-coded bins in every hallway, and running a two-week awareness workshop during homeroom periods.',
        viText: 'Mình hiểu rồi. Vậy đề án của chúng ta nên tập trung vào hai hành động chính: lắp đặt thùng rác 3 ngăn có mã màu ở mọi hành lang, và tổ chức chuỗi hội thảo nâng cao nhận thức kéo dài 2 tuần trong giờ sinh hoạt lớp.'
      },
      {
        id: 'tb1-6',
        speaker: 'Sarah',
        text: 'Great plan! What about budget? Can we fund the bins using profits from last week\'s school charity fair?',
        viText: 'Ý kiến rất hay! Còn về ngân sách thì sao? Chúng ta có thể trích quỹ mua thùng rác từ lợi nhuận hội chợ từ thiện tuần trước không?'
      },
      {
        id: 'tb1-7',
        speaker: 'Liam',
        text: 'Yes, Mr. Steven confirmed that the school board approved five hundred dollars from the charity fund specifically for environmental gear.',
        viText: 'Được chứ, thầy Steven đã xác nhận ban giám hiệu phê duyệt năm trăm đô la từ quỹ từ thiện dành riêng cho trang thiết bị môi trường.'
      }
    ],
    questions: [
      {
        id: 'qb1-1',
        type: 'multiple_choice',
        prompt: 'According to the waste audit, how much trash could actually be recycled?',
        promptVi: 'Theo kết quả kiểm toán rác thải, có bao nhiêu phần trăm rác thực chất có thể tái chế được?',
        options: [
          { id: 'opt-a', text: 'Nearly 20%' },
          { id: 'opt-b', text: 'Nearly 40%' },
          { id: 'opt-c', text: 'Exactly 50%' },
          { id: 'opt-d', text: 'Around 75%' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Sarah mentions: "nearly forty percent of what students throw into ordinary rubbish bins could actually be recycled."',
        explanationVi: 'Sarah nêu rõ: "nearly forty percent" (gần 40%).',
        transcriptClue: 'nearly forty percent of what students throw into ordinary rubbish bins could actually be recycled.'
      },
      {
        id: 'qb1-2',
        type: 'multiple_choice',
        prompt: 'Why does paper recycling frequently get contaminated?',
        promptVi: 'Tại sao các lô giấy tái chế thường xuyên bị lẫn tạp chất?',
        options: [
          { id: 'opt-a', text: 'The bins are kept outside in the heavy rain' },
          { id: 'opt-b', text: 'Students throw half-empty milk cartons into paper bins' },
          { id: 'opt-c', text: 'Janitors do not empty the bins daily' },
          { id: 'opt-d', text: 'The school buys poor quality notebooks' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Sarah explains that students toss half-empty milk cartons into paper bins, causing contamination.',
        explanationVi: 'Sarah giải thích học sinh vứt hộp sữa uống dở vào thùng giấy làm ướt và hỏng cả mẻ tái chế.',
        transcriptClue: 'when people toss half-empty milk cartons into paper bins, the whole batch becomes contaminated.'
      },
      {
        id: 'qb1-3',
        type: 'fill_in_blank',
        prompt: 'How much money did the school board approve from the charity fund? (Number only or words)',
        promptVi: 'Ban giám hiệu đã phê duyệt bao nhiêu đô la từ quỹ từ thiện?',
        acceptableAnswers: ['500', '$500', '500 dollars', 'five hundred dollars', 'five hundred'],
        correctAnswer: '500',
        explanation: 'Liam states: "Mr. Steven confirmed that the school board approved five hundred dollars".',
        explanationVi: 'Thầy Steven đã xác nhận duyệt 500 đô la ("five hundred dollars").',
        transcriptClue: 'approved five hundred dollars from the charity fund'
      },
      {
        id: 'qb1-4',
        type: 'true_false',
        prompt: 'The student council will install four-compartment bins in every classroom.',
        promptVi: 'Ban cán sự sẽ lắp thùng rác 4 ngăn ở tất cả các phòng học.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. They plan to install three-compartment colour-coded bins in every hallway, not four.',
        explanationVi: 'Sai. Họ dự kiến lắp thùng rác 3 ngăn ("three-compartment") ở hành lang.',
        transcriptClue: 'installing three-compartment colour-coded bins in every hallway'
      },
      {
        id: 'qb1-5',
        type: 'multiple_choice',
        prompt: 'When does the Green Campus Proposal need to be finalized?',
        promptVi: 'Bản đề án Trường học Xanh cần phải hoàn tất trước thời điểm nào?',
        options: [
          { id: 'opt-a', text: 'Before Tuesday afternoon' },
          { id: 'opt-b', text: 'Before Thursday\'s faculty meeting' },
          { id: 'opt-c', text: 'By next Monday morning' },
          { id: 'opt-d', text: 'At the end of this month' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Liam says they need to finalize it "before Thursday\'s faculty meeting".',
        explanationVi: 'Liam nói cần hoàn thiện "before Thursday\'s faculty meeting" (trước cuộc họp giáo viên vào thứ Năm).',
        transcriptClue: 'We need to finalize the Green Campus Proposal before Thursday\'s faculty meeting.'
      }
    ]
  },
  {
    id: 'b1-test-02',
    level: 'B1',
    title: 'Youth Summer Internship & Career Interview',
    vietnameseTitle: 'Thực tập hè & Phỏng vấn hướng nghiệp trẻ',
    topic: 'Career & Skills',
    topicVi: 'Kỹ năng & Hướng nghiệp',
    difficulty: 'Khá',
    estimatedMinutes: 8,
    description: 'Listen to a high school senior interviewing an advisor at a regional STEM and Creative Arts career fair.',
    descriptionVi: 'Nghe một học sinh lớp 12 phỏng vấn chuyên viên tư vấn tại ngày hội việc làm và hướng nghiệp ngành STEM & Nghệ thuật sáng tạo.',
    vocabulary: [
      {
        word: 'internship',
        ipa: '/ˈɪntɜːnʃɪp/',
        meaning: 'kỳ thực tập, công việc thực tập sinh',
        example: 'A summer internship gives students hands-on work experience.',
        exampleVi: 'Kỳ thực tập mùa hè mang lại cho học sinh kinh nghiệm làm việc thực tế.'
      },
      {
        word: 'mentor',
        ipa: '/ˈmentɔː(r)/',
        meaning: 'người cố vấn, người hướng dẫn',
        example: 'Each intern is assigned a senior mentor for weekly guidance.',
        exampleVi: 'Mỗi thực tập sinh được ghép đôi với một cố vấn cấp cao để được định hướng hàng tuần.'
      },
      {
        word: 'portfolio',
        ipa: '/pɔːtˈfəʊliəʊ/',
        meaning: 'hồ sơ năng lực, các tác phẩm tiêu biểu',
        example: 'Applicants should showcase their best design projects in a digital portfolio.',
        exampleVi: 'Ứng viên nên giới thiệu các dự án thiết kế tốt nhất trong hồ sơ năng lực trực tuyến.'
      },
      {
        word: 'collaborative',
        ipa: '/kəˈlæbərətɪv/',
        meaning: 'mang tính hợp tác, phối hợp nhóm',
        example: 'Modern technology companies value collaborative problem solving.',
        exampleVi: 'Các công ty công nghệ hiện đại coi trọng kỹ năng giải quyết vấn đề mang tính hợp tác.'
      }
    ],
    transcripts: [
      {
        id: 'tb2-1',
        speaker: 'Interviewer (David)',
        text: 'Good morning, Ms. Robinson. My name is David, and I am very keen on applying for the Youth Digital Media Internship this coming July.',
        viText: 'Chào cô Robinson ạ. Em tên là David, em rất quan tâm và muốn ứng tuyển vào vị trí Thực tập sinh Truyền thông số cho giới trẻ vào tháng Bảy tới.'
      },
      {
        id: 'tb2-2',
        speaker: 'Ms. Robinson',
        text: 'Welcome, David! We are thrilled to see so many young creators this year. The digital media track is open to students aged sixteen to eighteen who possess strong curiosity and basic editing skills.',
        viText: 'Chào mừng em David! Năm nay chúng tôi rất vui vì có nhiều bạn trẻ sáng tạo tham gia. Ngành truyền thông số dành cho các bạn từ 16 đến 18 tuổi có niềm đam mê học hỏi và kỹ năng biên tập cơ bản.'
      },
      {
        id: 'tb2-3',
        speaker: 'David',
        text: 'That sounds ideal for me. Could you explain what typical daily tasks look like, and whether the internship is full-time or part-time?',
        viText: 'Nghe thật phù hợp với em ạ. Cô có thể giải thích công việc hàng ngày cụ thể là gì, và đây là thực tập toàn thời gian hay bán thời gian không ạ?'
      },
      {
        id: 'tb2-4',
        speaker: 'Ms. Robinson',
        text: 'It is a part-time role requiring fifteen hours per week, usually spread across three mornings: Monday, Wednesday, and Friday from nine AM to two PM.',
        viText: 'Đây là công việc bán thời gian yêu cầu 15 giờ mỗi tuần, thường chia đều vào 3 buổi sáng: thứ Hai, thứ Tư và thứ Sáu từ 9 giờ sáng đến 2 giờ chiều.'
      },
      {
        id: 'tb2-5',
        speaker: 'Ms. Robinson',
        text: 'Interns assist our graphic designers with social media infographics, record short educational podcasts, and learn audio editing under the mentorship of senior staff.',
        viText: 'Các thực tập sinh sẽ hỗ trợ đội ngũ thiết kế đồ họa làm ảnh thông tin cho mạng xã hội, thu âm các đoạn podcast giáo dục ngắn và học biên tập âm thanh dưới sự hướng dẫn của các cố vấn cấp cao.'
      },
      {
        id: 'tb2-6',
        speaker: 'David',
        text: 'That aligns perfectly with my hobbies. When is the deadline to submit the online portfolio and recommendation letters?',
        viText: 'Dạ điều đó hoàn toàn khớp với sở thích của em. Hạn chót để nộp hồ sơ năng lực trực tuyến và thư giới thiệu là khi nào vậy cô?'
      },
      {
        id: 'tb2-7',
        speaker: 'Ms. Robinson',
        text: 'Applications close strictly on June twentieth. Shortlisted candidates will be invited for an informal video interview during the first week of July.',
        viText: 'Cổng ứng tuyển sẽ đóng chính xác vào ngày 20 tháng Sáu. Các ứng viên qua vòng hồ sơ sẽ được mời phỏng vấn video thân mật vào tuần đầu tiên của tháng Bảy.'
      }
    ],
    questions: [
      {
        id: 'qb2-1',
        type: 'multiple_choice',
        prompt: 'How many hours per week does the summer internship require?',
        promptVi: 'Kỳ thực tập mùa hè yêu cầu bao nhiêu giờ mỗi tuần?',
        options: [
          { id: 'opt-a', text: '10 hours per week' },
          { id: 'opt-b', text: '15 hours per week' },
          { id: 'opt-c', text: '25 hours per week' },
          { id: 'opt-d', text: '40 hours per week' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Ms. Robinson specifies: "fifteen hours per week, usually spread across three mornings".',
        explanationVi: 'Cô Robinson nói: "fifteen hours per week" (15 giờ mỗi tuần).',
        transcriptClue: 'It is a part-time role requiring fifteen hours per week'
      },
      {
        id: 'qb2-2',
        type: 'multiple_choice',
        prompt: 'Which days of the week do the interns work?',
        promptVi: 'Các thực tập sinh làm việc vào những ngày nào trong tuần?',
        options: [
          { id: 'opt-a', text: 'Tuesday, Thursday, and Saturday' },
          { id: 'opt-b', text: 'Monday, Wednesday, and Friday' },
          { id: 'opt-c', text: 'Saturday and Sunday only' },
          { id: 'opt-d', text: 'Every weekday from 9 to 5' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The schedule is Monday, Wednesday, and Friday from 9 AM to 2 PM.',
        explanationVi: 'Lịch làm việc là thứ Hai, thứ Tư và thứ Sáu từ 9h sáng đến 2h chiều.',
        transcriptClue: 'Monday, Wednesday, and Friday from nine AM to two PM.'
      },
      {
        id: 'qb2-3',
        type: 'fill_in_blank',
        prompt: 'What date do the applications strictly close? (e.g., June 20 or June twentieth)',
        promptVi: 'Cổng nộp đơn ứng tuyển đóng chính xác vào ngày nào?',
        acceptableAnswers: ['June 20', 'June 20th', 'June twentieth', '20 June', '20/6'],
        correctAnswer: 'June 20',
        explanation: 'Ms. Robinson states: "Applications close strictly on June twentieth."',
        explanationVi: 'Cô nêu rõ: "Applications close strictly on June twentieth" (ngày 20 tháng 6).',
        transcriptClue: 'Applications close strictly on June twentieth.'
      },
      {
        id: 'qb2-4',
        type: 'true_false',
        prompt: 'Interns will receive guidance from a senior staff mentor.',
        promptVi: 'Các thực tập sinh sẽ nhận được sự hướng dẫn từ một cố vấn cấp cao.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'true',
        explanation: 'True. They learn audio editing under the mentorship of senior staff.',
        explanationVi: 'Đúng. Họ được hướng dẫn: "under the mentorship of senior staff".',
        transcriptClue: 'learn audio editing under the mentorship of senior staff.'
      },
      {
        id: 'qb2-5',
        type: 'multiple_choice',
        prompt: 'What is the required age range for students applying to this track?',
        promptVi: 'Độ tuổi quy định cho học sinh đăng ký tham gia là bao nhiêu?',
        options: [
          { id: 'opt-a', text: '12 to 15 years old' },
          { id: 'opt-b', text: '16 to 18 years old' },
          { id: 'opt-c', text: 'Over 20 years old' },
          { id: 'opt-d', text: 'Any university graduate' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The track is open to students aged sixteen to eighteen.',
        explanationVi: 'Chương trình dành cho học sinh từ 16 đến 18 tuổi ("aged sixteen to eighteen").',
        transcriptClue: 'The digital media track is open to students aged sixteen to eighteen'
      }
    ]
  },

  // ================= B2 TESTS (UPPER-INTERMEDIATE) =================
  {
    id: 'b2-test-01',
    level: 'B2',
    title: 'Artificial Intelligence & Future Education',
    vietnameseTitle: 'Trí tuệ nhân tạo & Tương lai của nền giáo dục',
    topic: 'Technology & Education',
    topicVi: 'Công nghệ & Giáo dục hiện đại',
    difficulty: 'Nâng cao',
    estimatedMinutes: 10,
    description: 'Listen to a university panel discussion analyzing how artificial intelligence transforms classroom pedagogy and critical thinking.',
    descriptionVi: 'Nghe buổi tọa đàm đại học phân tích tác động của trí tuệ nhân tạo đối với phương pháp sư phạm và tư duy phản biện của học sinh.',
    vocabulary: [
      {
        word: 'pedagogy',
        ipa: '/ˈpedəɡɒdʒi/',
        meaning: 'phương pháp sư phạm, nghệ thuật giảng dạy',
        example: 'Innovative educators integrate adaptive AI software into modern pedagogy.',
        exampleVi: 'Các nhà giáo đổi mới tích hợp phần mềm AI thích ứng vào phương pháp sư phạm hiện đại.'
      },
      {
        word: 'critical thinking',
        ipa: '/ˌkrɪtɪkl ˈθɪŋkɪŋ/',
        meaning: 'tư duy phản biện, đánh giá độc lập',
        example: 'Students must cultivate critical thinking to evaluate algorithmic biases.',
        exampleVi: 'Học sinh phải trau dồi tư duy phản biện để đánh giá những định kiến trong thuật toán.'
      },
      {
        word: 'hallucination',
        ipa: '/həˌluːsɪˈneɪʃn/',
        meaning: 'hiện tượng AI bịa đặt thông tin (ảo giác AI)',
        example: 'Language models occasionally generate factual hallucinations with convincing tone.',
        exampleVi: 'Mô hình ngôn ngữ đôi khi tạo ra thông tin bịa đặt với giọng điệu rất thuyết phục.'
      },
      {
        word: 'personalized',
        ipa: '/ˈpɜːsənəlaɪzd/',
        meaning: 'được cá nhân hóa theo từng người',
        example: 'Personalized learning systems adjust exercise difficulty based on student performance.',
        exampleVi: 'Hệ thống học tập cá nhân hóa tự điều chỉnh độ khó bài tập dựa theo kết quả của học sinh.'
      }
    ],
    transcripts: [
      {
        id: 'tc1-1',
        speaker: 'Dr. Helen Vance (Moderator)',
        text: 'Good afternoon, esteemed guests and students. Today\'s symposium explores the double-edged sword of generative artificial intelligence in secondary and tertiary education.',
        viText: 'Xin chào quý vị đại biểu và các em học sinh. Buổi hội thảo hôm nay khám phá con dao hai lưỡi của trí tuệ nhân tạo tạo sinh trong giáo dục phổ thông và đại học.'
      },
      {
        id: 'tc1-2',
        speaker: 'Professor Marcus Chen',
        text: 'Thank you, Dr. Vance. When calculator technology emerged in the nineteen-seventies, educators feared basic arithmetic was doomed. Yet, it actually elevated students to explore higher-order conceptual mathematics.',
        viText: 'Cảm ơn Tiến sĩ Vance. Khi máy tính bỏ túi xuất hiện vào những năm 1970, giới giáo dục từng lo sợ khả năng tính toán cơ bản sẽ bị hủy hoại. Tuy nhiên, trên thực tế nó lại nâng tầm học sinh khám phá toán học lý thuyết bậc cao hơn.'
      },
      {
        id: 'tc1-3',
        speaker: 'Professor Marcus Chen',
        text: 'Similarly, AI tutors can provide round-the-clock personalized language feedback, pinpointing grammatical nuances and pronunciation subtleties that a single teacher managing forty students cannot constantly address.',
        viText: 'Tương tự, các trợ giảng AI có thể cung cấp phản hồi ngôn ngữ cá nhân hóa 24/7, chỉ ra những sắc thái ngữ pháp và độ chuẩn xác phát âm mà một giáo viên đứng lớp 40 học sinh khó có thể quan sát liên tục.'
      },
      {
        id: 'tc1-4',
        speaker: 'Dr. Helen Vance',
        text: 'A compelling historical parallel, Professor. However, critics argue that excessive reliance on automated summaries compromises deep reading comprehension and analytical rigour. What does research show?',
        viText: 'Một sự so sánh lịch sử rất thuyết phục thưa Giáo sư. Dù vậy, các nhà phê bình cho rằng việc quá ỷ lại vào các bản tóm tắt tự động sẽ làm suy giảm khả năng đọc hiểu sâu và tính chặt chẽ trong phân tích. Nghiên cứu thực tế chỉ ra điều gì?'
      },
      {
        id: 'tc1-5',
        speaker: 'Dr. Karen Silva (Cognitive Scientist)',
        text: 'Recent cognitive neuro-imaging studies from Oxford indicate that cognitive offloading can indeed weaken memory retention if students skip the wrestling phase with challenging texts.',
        viText: 'Các nghiên cứu hình ảnh thần kinh nhận thức gần đây từ Đại học Oxford chỉ ra rằng việc ủy thác nhận thức cho máy móc quả thực có thể làm suy yếu khả năng ghi nhớ nếu học sinh bỏ qua giai đoạn tự mình nghiền ngẫm các văn bản phức tạp.'
      },
      {
        id: 'tc1-6',
        speaker: 'Dr. Karen Silva',
        text: 'Therefore, our pedagogical approach shouldn\'t ban AI tools, but assess students through spontaneous oral examinations, debates, and verifiable problem-solving demonstrations.',
        viText: 'Do đó, phương pháp tiếp cận sư phạm của chúng ta không nên là cấm đoán công cụ AI, mà cần đánh giá người học thông qua các buổi vấn đáp trực tiếp, tranh biện và thuyết trình giải quyết vấn đề thực tế.'
      }
    ],
    questions: [
      {
        id: 'qc1-1',
        type: 'multiple_choice',
        prompt: 'What historical technology does Professor Chen compare current generative AI to?',
        promptVi: 'Giáo sư Chen đã so sánh AI hiện nay với công nghệ lịch sử nào?',
        options: [
          { id: 'opt-a', text: 'The printing press' },
          { id: 'opt-b', text: 'The electronic calculator in the 1970s' },
          { id: 'opt-c', text: 'The invention of the internet' },
          { id: 'opt-d', text: 'Television broadcasting' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Professor Chen compares AI to calculators emerging in the nineteen-seventies.',
        explanationVi: 'Giáo sư Chen so sánh AI với máy tính bỏ túi xuất hiện vào thập niên 1970 ("calculator technology in the nineteen-seventies").',
        transcriptClue: 'When calculator technology emerged in the nineteen-seventies, educators feared basic arithmetic was doomed.'
      },
      {
        id: 'qc1-2',
        type: 'multiple_choice',
        prompt: 'According to Dr. Karen Silva, what is a potential drawback of excessive cognitive offloading?',
        promptVi: 'Theo Tiến sĩ Karen Silva, đâu là tác hại tiềm ẩn của việc ủy thác nhận thức quá mức cho máy móc?',
        options: [
          { id: 'opt-a', text: 'It can weaken students\' memory retention' },
          { id: 'opt-b', text: 'It causes severe physical eye strain' },
          { id: 'opt-c', text: 'It prevents students from learning foreign languages' },
          { id: 'opt-d', text: 'It makes computers break down faster' }
        ],
        correctAnswer: 'opt-a',
        explanation: 'Dr. Silva states cognitive offloading can weaken memory retention if students skip wrestling with difficult texts.',
        explanationVi: 'Tiến sĩ Silva chỉ ra rằng nó có thể làm suy yếu khả năng ghi nhớ ("weaken memory retention").',
        transcriptClue: 'cognitive offloading can indeed weaken memory retention if students skip the wrestling phase'
      },
      {
        id: 'qc1-3',
        type: 'fill_in_blank',
        prompt: 'From which prestigious university were the neuro-imaging studies cited by Dr. Silva conducted?',
        promptVi: 'Nghiên cứu hình ảnh thần kinh được TS. Silva trích dẫn đến từ trường đại học danh tiếng nào?',
        acceptableAnswers: ['Oxford', 'University of Oxford', 'Oxford University'],
        correctAnswer: 'Oxford',
        explanation: 'Dr. Silva specifically cites studies from Oxford.',
        explanationVi: 'Nghiên cứu đến từ trường Đại học Oxford: "studies from Oxford".',
        transcriptClue: 'Recent cognitive neuro-imaging studies from Oxford indicate'
      },
      {
        id: 'qc1-4',
        type: 'true_false',
        prompt: 'Dr. Silva recommends that schools should completely ban all AI tools from the curriculum.',
        promptVi: 'Tiến sĩ Silva khuyên các trường học nên cấm hoàn toàn mọi công cụ AI trong chương trình.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Dr. Silva advises: "our pedagogical approach shouldn\'t ban AI tools, but assess students through spontaneous oral examinations, debates...".',
        explanationVi: 'Sai. Bà nhấn mạnh không nên cấm đoán công cụ AI: "our pedagogical approach shouldn\'t ban AI tools".',
        transcriptClue: 'our pedagogical approach shouldn\'t ban AI tools'
      },
      {
        id: 'qc1-5',
        type: 'multiple_choice',
        prompt: 'What alternative assessment method does the panel advocate for to verify authentic mastery?',
        promptVi: 'Hội đồng đề xuất phương thức kiểm tra thay thế nào để đánh giá năng lực thực chất của học sinh?',
        options: [
          { id: 'opt-a', text: 'Online multiple-choice tests at home' },
          { id: 'opt-b', text: 'Spontaneous oral examinations, debates, and problem-solving demos' },
          { id: 'opt-c', text: 'Take-home essays with no supervision' },
          { id: 'opt-d', text: 'Cancelling all academic testing completely' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'The panel advocates for oral examinations, debates, and verifiable problem-solving demonstrations.',
        explanationVi: 'Đánh giá qua thi vấn đáp trực tiếp, tranh biện và giải quyết vấn đề ("spontaneous oral examinations, debates, and verifiable problem-solving demonstrations").',
        transcriptClue: 'spontaneous oral examinations, debates, and verifiable problem-solving demonstrations.'
      }
    ]
  },
  {
    id: 'b2-test-02',
    level: 'B2',
    title: 'Marine Biology & Coral Reef Conservation',
    vietnameseTitle: 'Sinh học biển & Bảo tồn rạn san hô',
    topic: 'Science & Nature',
    topicVi: 'Khoa học tự nhiên & Hệ sinh thái biển',
    difficulty: 'Nâng cao',
    estimatedMinutes: 10,
    description: 'Listen to a guest marine biologist lecturing on coral bleaching mechanisms, ocean acidification, and ecological restoration.',
    descriptionVi: 'Nghe bài giảng của chuyên gia sinh học biển về cơ chế tẩy trắng san hô, axit hóa đại dương và các giải pháp phục hồi hệ sinh thái biển.',
    vocabulary: [
      {
        word: 'bleaching',
        ipa: '/ˈbliːtʃɪŋ/',
        meaning: 'hiện tượng tẩy trắng san hô do mất tảo cộng sinh',
        example: 'Thermal stress triggers coral bleaching across vast stretches of the barrier reef.',
        exampleVi: 'Áp lực nhiệt độ nước tăng kích hoạt hiện tượng tẩy trắng san hô trên các dải đá ngầm rộng lớn.'
      },
      {
        word: 'symbiotic',
        ipa: '/ˌsɪmbaɪˈɒtɪk/',
        meaning: 'mang tính cộng sinh đôi bên cùng có lợi',
        example: 'Corals share a vital symbiotic relationship with microscopic zooxanthellae algae.',
        exampleVi: 'San hô duy trì mối quan hệ cộng sinh sống còn với vi tảo zooxanthellae.'
      },
      {
        word: 'calcification',
        ipa: '/ˌkælsɪfɪˈkeɪʃn/',
        meaning: 'quá trình vôi hóa tạo khung xương',
        example: 'Acidic seawater inhibits calcification, making coral skeletons fragile.',
        exampleVi: 'Nước biển bị axit hóa ức chế quá trình vôi hóa, khiến khung xương san hô trở nên giòn và dễ gãy.'
      },
      {
        word: 'resilience',
        ipa: '/rɪˈzɪliəns/',
        meaning: 'khả năng chống chịu, độ phục hồi dẻo dai',
        example: 'Marine protected areas enhance the ecological resilience of fish populations.',
        exampleVi: 'Các khu bảo tồn biển giúp tăng cường khả năng phục hồi sinh thái của các quần thể cá.'
      }
    ],
    transcripts: [
      {
        id: 'tc2-1',
        speaker: 'Dr. Gregory Thorne (Marine Ecologist)',
        text: 'Welcome everyone to our specialized seminar on marine ecosystem stability. When we gaze upon a vibrant coral reef, we are looking at one of Earth\'s most densely populated biodiversity hotspots.',
        viText: 'Chào mừng tất cả các bạn đến với hội thảo chuyên đề về sự ổn định của hệ sinh thái biển. Khi chiêm ngưỡng một rạn san hô rực rỡ, chúng ta đang nhìn vào một trong những điểm nóng đa dạng sinh học trù phú nhất Trái Đất.'
      },
      {
        id: 'tc2-2',
        speaker: 'Dr. Gregory Thorne',
        text: 'Although coral reefs occupy less than zero point two percent of the ocean floor, they provide shelter, feeding grounds, and nursery zones for more than twenty-five percent of all marine species.',
        viText: 'Mặc dù các rạn san hô chỉ chiếm chưa đầy 0.2% diện tích đáy đại dương, chúng lại cung cấp nơi trú ẩn, bãi kiếm ăn và khu vực ươm mầm cho hơn 25% tổng số các loài sinh vật biển.'
      },
      {
        id: 'tc2-3',
        speaker: 'Dr. Gregory Thorne',
        text: 'To understand bleaching, you must understand the microscopic partnership. Coral polyps host photosynthetic algae called zooxanthellae within their cellular tissues.',
        viText: 'Để hiểu về hiện tượng tẩy trắng, các bạn cần hiểu mối quan hệ vi mô này. Các polyp san hô chứa các vi tảo quang hợp có tên là zooxanthellae bên trong mô tế bào của chúng.'
      },
      {
        id: 'tc2-4',
        speaker: 'Dr. Gregory Thorne',
        text: 'These algae supply up to ninety percent of the coral\'s nutritional energy via photosynthesis. But when sea surface temperatures rise merely one to two degrees Celsius above historical summer maximums, the algae produce reactive oxygen toxins.',
        viText: 'Những vi tảo này cung cấp tới 90% năng lượng dinh dưỡng cho san hô thông qua quá trình quang hợp. Nhưng khi nhiệt độ bề mặt nước biển tăng chỉ từ 1 đến 2 độ C so với mức đỉnh mùa hè trước đây, tảo sẽ sản sinh ra độc tố oxy phản ứng.'
      },
      {
        id: 'tc2-5',
        speaker: 'Dr. Gregory Thorne',
        text: 'Under distress, the coral is forced to expel the algae. Without them, the translucent coral flesh reveals the stark white calcium carbonate skeleton underneath.',
        viText: 'Trong tình trạng căng thẳng cực độ, san hô buộc phải trục xuất tảo ra ngoài. Thiếu đi tảo, lớp thịt trong suốt của san hô lộ ra bộ khung xương canxi cacbonat trắng toát bên dưới.'
      },
      {
        id: 'tc2-6',
        speaker: 'Dr. Gregory Thorne',
        text: 'Fortunately, if cooler temperatures return within four to six weeks, corals can reacquire algae and gradually recover. This is where selective breeding of heat-tolerant super-corals is demonstrating promising preliminary results in our Great Barrier Reef field trials.',
        viText: 'May mắn thay, nếu nhiệt độ mát mẻ trở lại trong vòng 4 đến 6 tuần, san hô có thể tái hấp thu tảo và hồi phục dần dần. Đây chính là lĩnh vực mà việc lai tạo chọn lọc các giống siêu san hô chịu nhiệt đang mang lại những kết quả ban đầu đầy hứa hẹn tại các đợt thử nghiệm thực địa ở rạn san hô Great Barrier.'
      }
    ],
    questions: [
      {
        id: 'qc2-1',
        type: 'multiple_choice',
        prompt: 'What proportion of all marine species depend on coral reefs for survival?',
        promptVi: 'Tỉ lệ phần trăm sinh vật biển phụ thuộc vào rạn san hô để sinh tồn là bao nhiêu?',
        options: [
          { id: 'opt-a', text: 'Less than 5%' },
          { id: 'opt-b', text: 'Approximately 10%' },
          { id: 'opt-c', text: 'More than 25%' },
          { id: 'opt-d', text: 'Nearly 75%' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'Dr. Thorne states that reefs support "more than twenty-five percent of all marine species."',
        explanationVi: 'Tiến sĩ Thorne nêu rõ: "more than twenty-five percent" (hơn 25% các loài sinh vật biển).',
        transcriptClue: 'provide shelter, feeding grounds, and nursery zones for more than twenty-five percent of all marine species.'
      },
      {
        id: 'qc2-2',
        type: 'multiple_choice',
        prompt: 'How much of a coral\'s nutritional energy is typically supplied by symbiotic algae?',
        promptVi: 'Vi tảo cộng sinh thường cung cấp bao nhiêu phần trăm năng lượng dinh dưỡng cho san hô?',
        options: [
          { id: 'opt-a', text: 'Around 20%' },
          { id: 'opt-b', text: 'Up to 50%' },
          { id: 'opt-c', text: 'Up to 90%' },
          { id: 'opt-d', text: '100% completely' }
        ],
        correctAnswer: 'opt-c',
        explanation: 'The algae supply "up to ninety percent of the coral\'s nutritional energy".',
        explanationVi: 'Vi tảo cung cấp tới 90% năng lượng ("up to ninety percent").',
        transcriptClue: 'These algae supply up to ninety percent of the coral\'s nutritional energy'
      },
      {
        id: 'qc2-3',
        type: 'fill_in_blank',
        prompt: 'Within how many weeks must cooler temperatures return for bleached corals to reacquire algae and recover? (e.g. 4 to 6 weeks)',
        promptVi: 'Nhiệt độ mát mẻ phải trở lại trong vòng mấy tuần để san hô có cơ hội tái hấp thu tảo và hồi phục?',
        acceptableAnswers: ['4 to 6 weeks', '4-6 weeks', '4 to 6', '4-6'],
        correctAnswer: '4 to 6 weeks',
        explanation: 'Dr. Thorne notes: "if cooler temperatures return within four to six weeks, corals can reacquire algae".',
        explanationVi: 'Nhiệt độ cần phục hồi trong vòng 4 đến 6 tuần ("within four to six weeks").',
        transcriptClue: 'if cooler temperatures return within four to six weeks, corals can reacquire algae'
      },
      {
        id: 'qc2-4',
        type: 'true_false',
        prompt: 'Coral reefs cover more than ten percent of the world\'s ocean floor.',
        promptVi: 'Rạn san hô bao phủ hơn 10% diện tích đáy đại dương thế giới.',
        options: [
          { id: 'true', text: 'True (Đúng)' },
          { id: 'false', text: 'False (Sai)' }
        ],
        correctAnswer: 'false',
        explanation: 'False. Dr. Thorne explicitly explains they "occupy less than zero point two percent of the ocean floor".',
        explanationVi: 'Sai. San hô chỉ chiếm chưa đầy 0.2% ("less than zero point two percent of the ocean floor").',
        transcriptClue: 'Although coral reefs occupy less than zero point two percent of the ocean floor'
      },
      {
        id: 'qc2-5',
        type: 'multiple_choice',
        prompt: 'What innovative conservation research is showing promising preliminary results?',
        promptVi: 'Nghiên cứu bảo tồn đổi mới sáng tạo nào đang đem lại kết quả thử nghiệm đầy hứa hẹn?',
        options: [
          { id: 'opt-a', text: 'Building artificial plastic glass barriers around all reefs' },
          { id: 'opt-b', text: 'Selective breeding of heat-tolerant super-corals' },
          { id: 'opt-c', text: 'Draining seawater during hot summer months' },
          { id: 'opt-d', text: 'Introducing deep-sea predator sharks' }
        ],
        correctAnswer: 'opt-b',
        explanation: 'Dr. Thorne highlights: "selective breeding of heat-tolerant super-corals is demonstrating promising preliminary results".',
        explanationVi: 'Lai tạo chọn lọc các giống siêu san hô chịu nhiệt ("selective breeding of heat-tolerant super-corals").',
        transcriptClue: 'selective breeding of heat-tolerant super-corals is demonstrating promising preliminary results'
      }
    ]
  }
];

