import { suggestedPageCount } from '@/lib/pages';
import type { Book, Bookmark } from '@/types/book';

const PRIDE = `It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters.

“My dear Mr. Bennet,” said his lady to him one day, “have you heard that Netherfield Park is let at last?”

Mr. Bennet replied that he had not.

“But it is,” returned she; “for Mrs. Long has just been here, and she told me all about it.”

Mr. Bennet made no answer.

“Do you not want to know who has taken it?” cried his wife impatiently.

“You want to tell me, and I have no objection to hearing it.”

This was invitation enough.

“Why, my dear, you must know, Mrs. Long says that Netherfield is taken by a young man of large fortune from the north of England; that he came down on Monday in a chaise and four to see the place, and was so much delighted with it that he agreed with Mr. Morris immediately; that he is to take possession before Michaelmas, and some of his servants are to be in the house by the end of next week.”

“What is his name?”

“Bingley.”

“Is he married or single?”

“Oh! single, my dear, to be sure! A single man of large fortune; four or five thousand a year. What a fine thing for our girls!”

“How so? How can it affect them?”

“My dear Mr. Bennet,” replied his wife, “how can you be so tiresome! You must know that I am thinking of his marrying one of them.”

“Is that his design in settling here?”

“Design! Nonsense, how can you talk so! But it is very likely that he may fall in love with one of them, and therefore you must visit him as soon as he comes.”

Mr. Bennet was among the earliest of those who waited on Mr. Bingley. He had always intended to visit him, though to the last always assuring his wife that he should not go; and till the evening after the visit was paid, she had no knowledge of it.`;

const WALDEN = `I went to the woods because I wished to live deliberately, to front only the essential facts of life, and see if I could not learn what it had to teach, and not, when I came to die, discover that I had not lived.

I did not wish to live what was not life, living is so dear; nor did I wish to practise resignation, unless it was quite necessary. I wanted to live deep and suck out all the marrow of life, to live so sturdily and Spartan-like as to put to rout all that was not life, to cut a broad swath and shave close, to drive life into a corner, and reduce it to its lowest terms.

Still we live meanly, like ants; though the fable tells us that we were long ago changed into men; like pygmies we fight with cranes; it is error upon error, and clout upon clout, and our best virtue has for its occasion a superfluous and evitable wretchedness.

Our life is frittered away by detail. An honest man has hardly need to count more than his ten fingers, or in extreme cases he may add his ten toes, and lump the rest. Simplicity, simplicity, simplicity! I say, let your affairs be as two or three, and not a hundred or a thousand; instead of a million count half a dozen, and keep your accounts on your thumb nail.

The nation itself, with all its so-called internal improvements, which, by the way, are all external and superficial, is just such an unwieldy and overgrown establishment, cluttered with furniture and tripped up by its own traps, ruined by luxury and heedless expense, by want of calculation and a worthy aim, as the million households in the land.

Why should we live with such hurry and waste of life? We are determined to be starved before we are hungry. Men say that a stitch in time saves nine, and so they take a thousand stitches to-day to save nine to-morrow.`;

const FRANKENSTEIN = `You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday; and my first task is to assure my dear sister of my welfare, and increasing confidence in the success of my undertaking.

I am already far north of London; and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves, and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes.

Inspirited by this wind of promise, my day dreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight.

There, Margaret, the sun is for ever visible; its broad disk just skirting the horizon, and diffusing a perpetual splendour. There—for with your leave, my sister, I will put some trust in preceding navigators—there snow and frost are banished; and, sailing over a calm sea, we may be wafted to a land surpassing in wonders and in beauty every region hitherto discovered on the habitable globe.

What may not be expected in a country of eternal light? I may there discover the wondrous power which attracts the needle; and may regulate a thousand celestial observations, that require only this voyage to render their seeming eccentricities consistent for ever.`;

const ODYSSEY = `Tell me, O muse, of that ingenious hero who travelled far and wide after he had sacked the famous town of Troy. Many cities did he visit, and many were the nations with whose manners and customs he was acquainted; moreover he suffered much by sea while trying to save his own life and bring his men safely home.

But do what he might he could not save his men, for they perished through their own sheer folly in eating the cattle of the Sun-god Hyperion; so the god prevented them from ever reaching home. Tell me, too, about all these things, O daughter of Jove, from whatsoever source you may know them.

So now all who escaped death in battle or by shipwreck had got safely home except Ulysses, and he, though he was longing to return to his wife and country, was detained by the goddess Calypso, who had got him into a large cave and wanted to marry him.

But as years went by, there came a time when the gods settled that he should go back to Ithaca; even then, however, when he was among his own people, his troubles were not yet over; nevertheless all the gods had now begun to pity him except Neptune, who still persecuted him without ceasing and would not let him get home.

And this was how Minerva began. She went to the hall of Jove and spoke among the immortals. “Father Jove,” said she, “and all you other gods that live in everlasting bliss, I have come to you to speak of Ulysses, who is of all men by far the wisest, and who has suffered more than any other.”`;

const MEDITATIONS = `Begin the morning by saying to thyself, I shall meet with the busy-body, the ungrateful, arrogant, deceitful, envious, unsocial. All these things happen to them by reason of their ignorance of what is good and evil.

But I who have seen the nature of the good that it is beautiful, and of the bad that it is ugly, and the nature of him who does wrong, that it is akin to me, not only of the same blood or seed, but that it participates in the same intelligence and the same portion of the divinity, I can neither be injured by any of them, for no one can fix on me what is ugly, nor can I be angry with my kinsman, nor hate him.

We are made for co-operation, like feet, like hands, like eyelids, like the rows of the upper and lower teeth. To act against one another then is contrary to nature; and it is acting against one another to be vexed and to turn away.

This thou must always bear in mind, what is the nature of the whole, and what is my nature, and how this is related to that, and what kind of a part it is of what kind of a whole; and that there is no one who hinders thee from always doing and saying the things which are according to the nature of which thou art a part.

The universe is transformation; life is opinion. If thou art pained by any external thing, it is not this thing that disturbs thee, but thy own judgement about it. And it is in thy power to wipe out this judgement now.`;

const JANE_EYRE = `There was no possibility of taking a walk that day. We had been wandering, indeed, in the leafless shrubbery an hour in the morning; but since dinner (Mrs. Reed, when there was no company, dined early) the cold winter wind had brought with it clouds so sombre, and a rain so penetrating, that further out-door exercise was now out of the question.

I was glad of it: I never liked long walks, especially on chilly afternoons: dreadful to me was the coming home in the raw twilight, with nipped fingers and toes, and a heart saddened by the chidings of Bessie, the nurse, and humbled by the consciousness of my physical inferiority to Eliza, John, and Georgiana Reed.

The said Eliza, John, and Georgiana were now clustered round their mama in the drawing-room: she lay reclined on a sofa by the fireside, and with her darlings about her (for the time neither quarrelling nor crying) looked perfectly happy. Me she had dispensed from joining the group.

A breakfast-room adjoined the drawing-room, I slipped in there. It contained a bookcase: I soon possessed myself of a volume, taking care that it should be one stored with pictures. I mounted into the window-seat: gathering up my feet, I sat cross-legged, like a Turk; and, having drawn the red moreen curtain nearly close, I was shrined in double retirement.

Folds of scarlet drapery shut in my view to the right hand; to the left were the clear panes of glass, protecting, but not separating me from the drear November day. At intervals, while turning over the leaves of my book, I studied the aspect of that winter afternoon.`;

function buildBook(
  book: Omit<Book, 'totalPages' | 'updatedAt'> & { totalPages?: number },
): Book {
  const totalPages = book.totalPages ?? suggestedPageCount(book.content);
  return {
    ...book,
    totalPages,
    currentPage: Math.min(Math.max(1, book.currentPage), totalPages),
    updatedAt: book.createdAt,
  };
}

export const SAMPLE_BOOKS: Book[] = [
  buildBook({
    id: 'book_pride',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    description:
      'A sharp, luminous comedy of manners about love, class, and the courage to revise a first impression.',
    category: 'Classic',
    currentPage: 3,
    content: PRIDE,
    status: 'reading',
    createdAt: '2026-03-12T09:00:00.000Z',
    lastReadAt: '2026-09-12T21:10:00.000Z',
  }),
  buildBook({
    id: 'book_walden',
    title: 'Walden',
    author: 'Henry David Thoreau',
    description:
      'A quiet argument for deliberate living, written from a small house beside a pond in Concord.',
    category: 'Essay',
    currentPage: 2,
    content: WALDEN,
    status: 'reading',
    createdAt: '2026-04-02T11:20:00.000Z',
    lastReadAt: '2026-09-10T08:40:00.000Z',
  }),
  buildBook({
    id: 'book_frank',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description:
      'A gothic meditation on creation, loneliness, and the cost of ambition without care.',
    category: 'Classic',
    currentPage: 1,
    content: FRANKENSTEIN,
    status: 'unread',
    createdAt: '2026-06-18T16:00:00.000Z',
  }),
  buildBook({
    id: 'book_odyssey',
    title: 'The Odyssey',
    author: 'Homer',
    description:
      'The long way home: a wandering epic of cunning, hospitality, and the pull of Ithaca.',
    category: 'Poetry',
    currentPage: 1,
    content: ODYSSEY,
    status: 'unread',
    createdAt: '2026-07-01T10:00:00.000Z',
  }),
  buildBook({
    id: 'book_meditations',
    title: 'Meditations',
    author: 'Marcus Aurelius',
    description:
      'Private notes of a Roman emperor on duty, transience, and how to meet the day without bitterness.',
    category: 'Philosophy',
    currentPage: 99,
    content: MEDITATIONS,
    status: 'finished',
    createdAt: '2026-01-20T08:00:00.000Z',
    lastReadAt: '2026-08-22T19:00:00.000Z',
  }),
  buildBook({
    id: 'book_eyre',
    title: 'Jane Eyre',
    author: 'Charlotte Brontë',
    description:
      'An orphan’s fierce claim to inner life, independence, and a love that will not ask her to disappear.',
    category: 'Classic',
    currentPage: 99,
    content: JANE_EYRE,
    status: 'finished',
    createdAt: '2026-02-08T14:30:00.000Z',
    lastReadAt: '2026-07-30T22:15:00.000Z',
  }),
];

export const SAMPLE_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm_pride_3',
    bookId: 'book_pride',
    page: 3,
    preview: '“What is his name?” “Bingley.” “Is he married or single?”',
    createdAt: '2026-09-12T21:12:00.000Z',
  },
  {
    id: 'bm_walden_2',
    bookId: 'book_walden',
    page: 2,
    preview: 'Simplicity, simplicity, simplicity! I say, let your affairs be as two or three.',
    createdAt: '2026-09-10T08:42:00.000Z',
  },
];
