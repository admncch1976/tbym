
import { QuizQuestion, Section } from './types';

export const LANDING_QUOTE = "To be loved but not known is comforting but superficial. To be known and not loved is our greatest fear. But to be fully known and truly loved is, well, a lot like being loved by God.";

export const ADULT_DECKS: Section[] = [
  {
    id: 'faith',
    title: '1. Faith & Theology',
    icon: '🕊️',
    description: 'Core beliefs and biblical interpretation.',
    questions: [
      'What do you believe about God, Jesus, salvation, and the Bible?',
      'How do you decide what is true when Christians disagree?',
      'How do you understand and interpret the Bible?',
      'What role does church tradition and pastors play in shaping your beliefs?',
      'How important is sound doctrine to you?',
      'Are there any theological issues you feel strongly about?',
      'How do you handle seasons of spiritual dryness or doubt?',
      'What is your view on the gifts and role of the Holy Spirit today?',
      'How do you engage with people of other faiths or no faith?',
      'What is your understanding of the "Sabbath" and spiritual rest?',
      'How does your faith influence your political or social views?',
      'How do you handle it when you feel God is silent or prayers aren\'t answered?',
      'What is your view on the relationship between science and faith?',
      'How do you handle doctrinal disagreements with your spouse?',
      'What spiritual disciplines are non-negotiable for our home?'
    ],
    prompts: [
      ['Can you explain the Gospel?', 'Is the Bible your final authority?'],
      ['Personal study vs. Pastoral teaching?', 'Grace in disagreement.'],
      ['Literal, cultural, or historical?', 'Application to daily life.'],
      ['Submission to leadership?', 'Valuing tradition.'],
      ['Is shared doctrine a deal-breaker?', 'Love vs. Truth.'],
      ['Baptism, gifts, end times?', 'Handling differing views.'],
      ['Support during doubt.', 'Honest communication with God.'],
      ['Theology of the Spirit.', 'Experience vs. Scripture.'],
      ['Evangelism vs. Respect.', 'Social boundaries.'],
      ['Unplugging from work.', 'Spiritual disciplines.'],
      ['Biblical values in the public square.'],
      ['Trusting God\'s sovereignty.', 'Honesty in prayer.'],
      ['Creation, evolution, and medical care.'],
      ['Agreeing to disagree vs. unified teaching.'],
      ['Fasting, solitude, study.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'worship',
    title: '2. Worship & Spiritual Life',
    icon: '🙏',
    description: 'Devotional habits and church life.',
    questions: [
      'How important is Sunday church attendance for you?',
      'Should we be actively involved in church (ministry, small group, serving)?',
      'How important is music in worship for you?',
      'What are your current personal devotional habits?',
      'What would family prayer time look like in our home?',
      'Who would lead family devotions?',
      'Are we comfortable praying together as a couple now?',
      'How do you feel about tithing? How much should we give?',
      'How do you feel about Christian holidays vs secular festivals?',
      'What is your view on regular fasting and spiritual retreats?',
      'How should we handle it if one of us wants to change churches?',
      'How do we prioritize church life vs family gatherings?',
      'How do we handle it if our spiritual growth rates differ?'
    ],
    prompts: [
      ['A duty or a delight?', 'Prioritizing fellowship.'],
      ['Serving together?', 'Time management.'],
      ['Style of music preference.', 'Worship as a heart posture.'],
      ['Consistency check.', 'Prayer, Bible reading, fasting.'],
      ['Morning or night rituals.', 'Scripture reading as a family.'],
      ['Traditional roles vs. Partnership.', 'Spiritual headship.'],
      ['Starting the habit now.', 'Vulnerability in prayer.'],
      ['10% or generosity?', 'Financial stewardship.'],
      ['Christmas/Easter focus.', 'Cultural boundaries.'],
      ['Spiritual discipline.', 'Intentional quiet time.'],
      ['Theological alignment.', 'Community roots.'],
      ['Holiday commitments.', 'Kingdom first.'],
      ['Patience and encouragement vs. Frustration.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'roles',
    title: '3. Husband & Wife Roles',
    icon: '🏠',
    description: 'Headship, submission, and daily dynamics.',
    questions: [
      'What does “headship” and “submission” mean to you in practical life?',
      'How do we make decisions when we disagree?',
      'How should we handle friendships with the opposite sex after marriage?',
      'How should household chores be divided?',
      'What does a normal weekday evening look like for you?',
      'Expectations regarding physical intimacy?',
      'How transparent should we be about finances?',
      'Joint account or separate accounts?',
      'How will we support each other’s personal hobbies and career growth?',
      'Who will handle the daily logistics (bills, school forms, groceries)?',
      'What is your view on "date night" frequency and priority?',
      'If one of us is offered a dream job in another city, how do we decide?',
      'How do we handle our public image vs our private reality?',
      'What is your view on "equal but different" in daily tasks?'
    ],
    prompts: [
      ['Biblical definitions.', 'Leadership as service.'],
      ['Consensus vs. Final word.', 'Seeking counsel.'],
      ['Social media boundaries.', 'One-on-one meetings.'],
      ['Fairness and capability.', 'Traditional vs. Modern.'],
      ['Rest vs. Productivity.', 'Together time.'],
      ['Communication about needs.', 'Frequency, initiation, purity.'],
      ['Full disclosure.', 'Hidden expenses.'],
      ['Unity in money.', 'Financial trust.'],
      ['Individual growth.', 'Sacrifice for the other.'],
      ['Administrative load.', 'Clear expectations.'],
      ['Protecting the marriage from "busy-ness".'],
      ['Career sacrifice.', 'Family mission.'],
      ['Social media honesty.', 'Vulnerability.'],
      ['Flexible roles based on giftings.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'children',
    title: '4. Children',
    icon: '👶',
    description: 'Vision for parenting and discipline.',
    questions: [
      'Do you want children? Why or why not?',
      'When should we plan for children?',
      'How many children would you like?',
      'Would we consider adoption?',
      'How do you believe children should be disciplined?',
      'What are acceptable and unacceptable methods of discipline?',
      'Public school, Christian school, or homeschooling?',
      'How important is bedtime routine and family time?',
      'How do we show affection to our children?',
      'How would we handle a child who chooses a different path/faith?',
      'How involved should grandparents be in raising our children?',
      'How would we handle a child with special needs or chronic illness?',
      'What are your views on screen time and technology for kids?',
      'How do we teach our children about money and stewardship?'
    ],
    prompts: [
      ['Desire for legacy.', 'Ministry impact.'],
      ['Timing and readiness.', 'Career considerations.'],
      ['Space and resources.', 'Trusting God with size.'],
      ['Theology of adoption.', 'Providing a home.'],
      ['Consistency.', 'Correction with love.'],
      ['Boundaries.', 'Cultural differences.'],
      ['Values vs. Socialization.', 'Financial cost.'],
      ['Consistency.', 'Intentionality.'],
      ['Physical touch.', 'Words of affirmation.'],
      ['Unconditional love.', 'Parental prayer.'],
      ['Setting boundaries with elders.'],
      ['Sacrificial parenting.', 'Trusting God in trials.'],
      ['Smartphones, social media, games.'],
      ['Giving, saving, and contentment.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'inlaws',
    title: '5. In-Laws & Extended Family',
    icon: '🇮🇳',
    description: 'Indian family dynamics and boundaries.',
    questions: [
      'What role should our parents have in our decisions?',
      'Should we live with parents, nearby, or separately?',
      'How often should we visit each side of the family?',
      'How do we handle conflicts involving in-laws?',
      'If parents interfere in our marriage, how will we respond?',
      'What financial responsibility do we have toward our parents?',
      'During festivals and holidays, how will we divide time?',
      'How do we handle cultural traditions from parents that we disagree with?',
      'How much information about our marriage is too much to share with parents?',
      'How will we care for aging parents in the future?',
      'How do we handle parents who use guilt to get their way?',
      'What are the boundaries regarding parents having a key to our home?',
      'How do we handle financial requests from extended family members?'
    ],
    prompts: [
      ['Leaving and cleaving.', 'Honoring with boundaries.'],
      ['Privacy needs.', 'Economic benefits.'],
      ['Fairness.', 'Travel plans.'],
      ['Spousal loyalty first.', 'Conflict resolution.'],
      ['United front.', 'Direct communication.'],
      ['Support vs. Allowance.', 'Elder care.'],
      ['Alternating traditions.', 'Hospitality.'],
      ['Wisdom in refusal.', 'Honoring the heart.'],
      ['Guarding privacy.', 'Internal loyalty.'],
      ['Housing and health care plans.'],
      ['Emotional manipulation.', 'Firm grace.'],
      ['Privacy boundaries.', 'Unannounced visits.'],
      ['Saying "No" with love.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'patterns',
    title: '6. Family Patterns',
    icon: '🌳',
    description: 'Learning from the past and breaking cycles.',
    questions: [
      'What did you admire about your parents’ marriage?',
      'What do you NOT want to repeat from your home?',
      'How was conflict handled in your family?',
      'How did your father treat your mother?',
      'How did your mother speak about your father?',
      'Was affection openly shown in your house?',
      'Was money openly discussed or secretive?',
      'What habits from your home do you want to continue?',
      'What patterns must stop with us?',
      'What was the typical atmosphere of your dinner table growing up?',
      'How were "difficult emotions" (sadness, anger) handled?',
      'What is your relationship with your siblings like now?'
    ],
    prompts: [
      ['Strengths.', 'Lasting values.'],
      ['Weaknesses.', 'Generational sins.'],
      ['Silence vs. Fighting.', 'Apology style.'],
      ['Service and respect.', 'Leadership style.'],
      ['Support vs. Undermining.', 'Tone of voice.'],
      ['Physical touch.', 'Affirmation.'],
      ['Transparency.', 'Financial fear.'],
      ['Prayer, meals, visits.', 'Faithfulness.'],
      ['Anger, addiction, neglect.'],
      ['Communication.', 'Warmth vs. Tension.'],
      ['Emotional intelligence check.'],
      ['Family support vs. Drain.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'lifestyle',
    title: '7. Lifestyle & Money',
    icon: '💰',
    description: 'Financial stewardship and expectations.',
    questions: [
      'Do we want to own a home or rent?',
      'What type of area do you want to live in?',
      'How many vehicles do we need?',
      'What is your attitude toward loans and debt?',
      'How do we make big financial decisions?',
      'How much should we save monthly?',
      'How important is financial stability before marriage?',
      'What is your view on salary expectations?',
      'Do we have a "fun money" allowance for personal spending?',
      'How much should we budget for charitable giving/missions?',
      'What is our stance on lending money to family/friends?',
      'What is our philosophy on inheritance and legacy?',
      'How do we distinguish between "needs" and "wants"?'
    ],
    prompts: [
      ['Investment vs. Mobility.', 'Long term goal.'],
      ['Safety, commute, community.'],
      ['Utility vs. Status.'],
      ['Biblical view on debt.', 'Credit card usage.'],
      ['Spending limit threshold.', 'Shared vision.'],
      ['Emergency funds.', 'Future planning.'],
      ['Minimum readiness.', 'Trusting God.'],
      ['Peace of mind.', 'Lifestyle standard.'],
      ['Autonomy.', 'Avoiding resentment.'],
      ['Kingdom investment.', 'Sacrificial giving.'],
      ['Protecting our unity.', 'Wisdom in helping.'],
      ['Stewardship.', 'Generosity to future generations.'],
      ['Contentment vs. Consumption.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'conflict',
    title: '9. Conflict & Communication',
    icon: '⚡',
    description: 'Apology, forgiveness, and resolution.',
    questions: [
      'What usually makes you angry?',
      'When upset, do you withdraw or confront?',
      'How soon should we address issues?',
      'Is it okay to sleep without resolving conflict?',
      'Would you be open to counseling if needed?',
      'How do you prefer to apologize and forgive?',
      'What is your "fighting style" (loud, quiet, sarcastic)?',
      'How do we know when we have truly reconciled?',
      'What are our "forbidden words" in an argument?',
      'How do we handle it if one of us is consistently "wrong"?',
      'What is our plan for when we reach an absolute stalemate?',
      'How do we protect our children from seeing unhealthy conflict?'
    ],
    prompts: [
      ['Triggers.', 'Emotional health.'],
      ['Silent treatment vs. Blow-up.'],
      ['"Do not let the sun go down".', 'Processing time.'],
      ['Emergency resolution.', 'Night-time peace.'],
      ['Mentorship vs. Professional.', 'Preventative.'],
      ['Love languages.', 'Restoring trust.'],
      ['Self-awareness.', 'Emotional regulation.'],
      ['Peace vs. Resolution.', 'Forgiveness check.'],
      ['Name-calling, bringing up the past.'],
      ['Grace vs. Correction.'],
      ['Third-party counsel.', 'Humility.'],
      ['United front.', 'Repairing after a fight.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'final',
    title: '💍 The Final Question',
    icon: '💍',
    description: 'Covenant commitment.',
    questions: [
      'Why do you want to get married?',
      'Are you ready for covenant responsibility, not just companionship?',
      'If we faced financial hardship, infertility, illness, or persecution — would your commitment remain?',
      'What is the one thing you are most afraid of in marriage?',
      'Are you willing to pray for me every single day?',
      'Do you believe this is God\'s leading for us?',
      'Are you willing to change for the sake of our marriage?'
    ],
    prompts: [
      ['Holiness vs. Happiness.', 'God\'s glory.'],
      ['Sacrifice.', 'Dying to self.'],
      ['Unconditional love.', 'Sovereign grace.'],
      ['Vulnerability.', 'Sharing fears.'],
      ['Spiritual support.', 'Intercession.'],
      ['Peace of heart.', 'Mutual confirmation.'],
      ['Flexibility.', 'Continuous growth.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  }
];

export const YOUNGER_DECKS: Section[] = [
  {
    id: 'understanding',
    title: 'Marriage Foundations',
    icon: '🌱',
    description: 'Formation before discernment.',
    questions: [
      'What is the purpose of marriage?', 
      'Why do I want to be married?', 
      'Covenant vs Companionship?',
      'What does "dying to self" practically look like?',
      'How am I building a community of support now?',
      'What does "godly character" mean to me in a spouse?',
      'Am I ready to prioritize another person\'s needs over my own?',
      'How do I handle my own loneliness right now?',
      'Can I name 3 things I am willing to change about myself for a spouse?',
      'How do I manage my social media time and its impact on my mind?'
    ],
    prompts: [
      ['Think beyond happiness.', 'Biblical vision.'],
      ['Is it pressure?', 'Loneliness check.'],
      ['Personal gain vs. Shared mission.'],
      ['Daily sacrifice.', 'Serving others.'],
      ['Mentor check.', 'Church community.'],
      ['Virtue list.', 'Fruit of the Spirit.'],
      ['Selfishness check.'],
      ['God as first love.', 'Healthy solitude.'],
      ['Self-awareness.', 'Humility.'],
      ['Comparison traps.', 'Digital peace.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  },
  {
    id: 'finish',
    title: 'Finish Before You Start',
    icon: '🎓',
    description: 'The foundation of maturity.',
    questions: [
      'Education Completion?', 
      'Career Direction?', 
      'Financial Independence Plan?',
      'Do I have a consistent work ethic?',
      'Can I manage my own logistics (laundry, food, bills)?',
      'What are my non-negotiables for my future career?',
      'How do I handle my parents\' expectations for my future?',
      'Am I living a lifestyle that I can sustain on my own?',
      'Do I have a plan for professional skill building?',
      'How do I handle time management and laziness?'
    ],
    prompts: [
      ['Delayed degrees?', 'Family support.'],
      ['Skill building.', 'Stability.'],
      ['Budgeting basics.', 'Independence.'],
      ['Diligent living.', 'Reliability.'],
      ['Life skills.', 'Ready for responsibility.'],
      ['Ambition vs. Family.', 'Location.'],
      ['Honoring vs. Independence.'],
      ['Stewardship check.'],
      ['Entrepreneurship vs. Job.', 'Stability.'],
      ['Discipline.', 'Productivity.']
    ],
    userAAnswers: [], userBAnswers: [], isLocked: false
  }
];

export const READINESS_QUIZ_YOUNGER: QuizQuestion[] = [
  { id: 1, category: 'Studies', text: 'I have completed my primary education/degree.', weight: 1 },
  { id: 2, category: 'Finance', text: 'I am earning enough to support myself independently.', weight: 1 },
  { id: 3, category: 'Maturity', text: 'I can handle major life disappointments without spiraling.', weight: 1 },
  { id: 4, category: 'Spiritual', text: 'I have a consistent personal prayer life independent of my family.', weight: 1 },
  { id: 5, category: 'Counsel', text: 'I actively seek and follow the advice of my elders/pastors.', weight: 1 }
];

export const READINESS_QUIZ_ADULT: QuizQuestion[] = [
  { id: 1, category: 'Stability', text: 'I have a stable career or income source.', weight: 1 },
  { id: 2, category: 'Conflict', text: 'I can apologize even when I think I am 70% right.', weight: 1 },
  { id: 3, category: 'Family', text: 'I am ready to prioritize my spouse over my parents’ demands.', weight: 1 },
  { id: 4, category: 'Purity', text: 'I am walking in victory over secret habits.', weight: 1 }
];
