/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
document.title="Night Witches";
// TODO list:
//   layout on tablet screen?
//   enforce maxmoves
//   allow foreign character move
//   add delete character support
//   save/load harm info

const formatStat = function(num) {
  if (num < 0) {
    return `${num}`;
  } else {
    return `+${num}`;
  }
};


const ranks = ["Sergeant", "Junior Lieutenant", " Lieutenant", "Senior  Lieutenant", "Captain", "Major"];
const feels = ["love", "trust", "admire", "respect", "hate", "resent", "pity", "fear"];
const natures = {
  hawk: {
    name: "Hawk",
    moves:
      [
       {name: "Suka", desc: "You enjoy +1 ongoing when acting like a hooligan. When you act like a lady you are marked."},
       {name: "People’s Hero", desc: "Name the high-ranking official who has taken a personal interest in your career."},
       {name: "11.4 Meters Tip-to-Tip", desc: "When you want to land in some new place, you can ask “Is it remotely possible to land there?” and the GM will tell you. If the answer is yes, you don’t need to roll the Wheels Down move."},
       {name: "As Seen In Pravda", desc: "Use +medals instead of +guts when you Tempt Fate."},
       {name: "Miss Sverdlovsk 1939", desc: "Advance the first time you have sex with each of: a Senior Lieutenant, a Captain, a Major, a Lieutenant Colonel, or a Colonel."},],
    marks:
      ["Suffer the death of a friend or lover.",
      "Witness the death of a comrade.",
      "Give your aircraft a personality.",
      "Make a friend or take a lover.",
      "Tell a self-aggrandizing lie.",
      "Share a painful truth about yourself.",
      "Acquire a dread or superstition.",
      "Put duty before health or love.",
      "Advance and grow.",
      "Tell a war story.",
      "Tell a story of home.",
      "Embrace Death and face your final destiny.",]
  },
  owl: {
    name: "Owl",
    moves:
      [
        {name: "Greater Good", desc: "Rewrite an unused mark to read “Abandon a comrade and Advance”"},
        {name: "Prodigal Daughter", desc: "Whenever you return to the Regiment after being assumed captured or dead, advance as if it were the end of a duty station."},
        {name: "Intense Navigation", desc: "To find a target at night, you don’t need to Wayfind if you instead take a mark or 1-harm, your choice. "},
        {name: "Pull Rank", desc: "Take +1 forward when you Act Up if you outrank the target."},
        {name: "Political Thought", desc: "When you Eyeball you may also ask “Is there evidence of violation of Articles 58 and 133?” "},],
    marks:
      ["Suffer the death of a friend or lover.",
      "Witness the death of a comrade.",
      "Share a premonition.",
      "Make a friend or take a lover.",
      "Inform the authorities.",
      "Publicly shame a comrade.",
      "Earn a medal you don't deserve.",
      "Put safety or love before duty.",
      "Advance and grow.",
      "Tell a war story.",
      "Tell a story of home.",
      "Embrace Death and face your final destiny.",]
  },
  pigeon: {
    name: "Pigeon",
    moves:
      [
        {name:"Shit Talking", desc: "Call out another player character you despise at a debriefing and roll +Regard. On a 10+ hold three; on 7-9 hold one. Spend your holds, one for one, to give this person -1 forward."},
        {name:"Forbidden Love", desc: "When you take a lover, keep it secret. If discovered, face the consequences together or abandon your lover and advance."},
        {name:"Androgynous", desc: "You can Act Up by acting like a man - not a hooligan - using +guts. On a miss you are marked."},
        {name:"Bedside Manner", desc:"When you treat someone who has been badly hurt, roll +luck. On a hit it isn’t so bad. On 7-9 finding out takes a lot of time, energy or resources, GM chooses."},
        {name:"Enthusiastic Support", desc: "When you are Wingman, choose the consequences for the aircrew leading the Attack Run."},],
    maxRegard: 5,
    maxPromos: 3,
    marks:
      ["Suffer the death of a friend or lover.",
      "Witness the death of a comrade.",
      "Give your aircraft a personality.",
      "Make a friend or take a lover.",
      "Comfort a dying friend.",
      "Betray a friend or lover.",
      "Disgrace yourself or your uniform.",
      "Ignore a problem until it overwhelms.",
      "Advance and grow.",
      "Tell a war story.",
      "Tell a story of home.",
      "Embrace Death and face your final destiny.",]
  },
  raven: {
    name: "Raven",
    moves:
      [
        {name: "To Hell With Death", desc: "When you would be marked, name a player character who is marked instead if you wish."},
        {name: "Permanent File", desc: "When you submit an official report to your superiors, roll +skill. On a 10+, choose 2. On 7-9, choose 1: Mark someone; Change accepted truth of a situation; Add one to the mission pool"},
        {name: "Fortune’s Fool", desc: "Choose a single move. Replace the rolled stat with +Luck when you roll trigger it."},
        {name: "Voron", desc: "When you steal a treasured possession from someone, they are marked. If the “treasured possession” is their lover or their future, advance."},
        {name: "Sacrifice", desc: "When you are sent to the hospital to recover from combat injuries, you may choose your assignment, squadron, section and aircraft when you return."},],
    marks:
      ["Suffer the death of a friend or lover.",
      "Witness the death of a comrade.",
      "Share a premonition.",
      "Tell the unvarnished truth.",
      "Claim something as your own.",
      "Ignore a problem until it overwhelms.",
      "Change posts for the wrong reasons.",
      "Act against your best interests.",
      "Advance and grow.",
      "Tell a war story.",
      "Tell a story of home.",
      "Embrace Death and face your final destiny.",]
  },
  sparrow: {
    name: "Sparrow",
    moves:
      [
        {name:"Dark Bargain", desc: "You can elect to be marked in order to remove all harm from yourself or another."},
        {name:"Ghosts", desc: "Choose a dead comrade and hold three. When you ask your friend for help, spend your holds one for one to succeed as if you had rolled a 10+. Every time you do this you are also harmed or marked by the experience, your choice. "},
        {name:"Transcendent Love", desc: "Choose your one and only lover.  Your bond is unshakable. The first time you take the mark “Embrace Death”, immediately erase it."},
        {name:"Murky Past", desc: "You guard your history carefully. Choose two things you are hiding: Valuable training, prominent family, political connections, a strange secret, portable wealth. Define them whenever you want. Reveal either of these aspects of your past to save the day, make an impression or ruin someone."},
        {name:"Ambition", desc: "Once per duty station, do something explicitly against orders, then Tempt Fate and advance."},],
    maxRegard: 3,
    maxMoves: 5,
    marks:
      ["Suffer the death of a friend or lover.",
      "Witness the death of a comrade.",
      "Share a premonition.",
      "Call dangerous attention to yourself.",
      "Speak truth to power.",
      "Spread a vicious rumour.",
      "Reveal a secret.",
      "Act against your best interests.",
      "Advance and grow.",
      "Tell a war story.",
      "Tell a story of home.",
      "Embrace Death and face your final destiny.",]
  }
};
const roles = [
  {name:"Adventurer", desc:"You can bring a plane <strong>Wheels Down</strong> well."},
  {name:"Dreamer", desc:"You can weather an <strong>Informal Interview</strong> well."},
  {name:"Leader", desc:"You can lead an <strong>Attack Run</strong> well."},
  {name:"Misanthrope", desc:"You can <strong>Scrounge</strong> well."},
  {name:"Protector", desc:"You can <strong>Repair</strong> well."},
  {name:"Zealot", desc: "You can help the section during <strong>Debrief</strong> by criticizing a fellow airwoman."},];

const generateName = function() {
  const givenNames = ["Evgeniya (Zhenya)",
  "Galina (Galya)",
  "Olga (Olya)",
  "Alexandra (Sasha)",
  "Yekaterina (Katya)",
  "Elena (Lena)",
  "Irina (Ira)",
  "Elizaveta (Liza)",
  "Lyudmila (Lyuda)",
  "Svetlana (Sveta)",
  "Natalya (Natasha)",
  "Lyubov (Lyuba)",
  "Yuliya (Yulya)",
  "Tatyana (Tanya)",
  "Ksenya (Ksyusha)",
  "Valentina (Valya)",
  "Mariya (Masha)",
  "Anastasiya (Nastya)",
  "Darya (Dasha)",
  "Anna (Anka)",
  "Larisa (Lara)",
  "Tamara (Toma)",
  "Yelena (Lena)",
  "Oksana (Ksana)",
  "Vera (Veruschka)",
  "Nadezhda (Nadya)",
  "Sofia (Sonya)",
  "Marina",
  "Polina (Polya)",
  "Valeria (Lira)",
  "Diana (Dina)",
  "Alyona (Alya)",
  "Nina (Ninochka)",
  ];
  const surnames = ["Unvarova",
  "Shchepkina",
  "Yubkina",
  "Alexandrova",
  "Ventseslava",
  "Zavorokhina",
  "Avdeyeva",
  "Yegorova",
  "Kuznetsova",
  "Petrova",
  "Berezovskya",
  "Zubova",
  "Andreyeva",
  "Bobkova",
  "Golovina",
  "Yusupova",
  "Trushina",
  "Sheremeteva",
  "Vavilova",
  "Zubareva",
  "Isayeva",
  "Kazakova",
  "Vyrpayeva",
  "Kurdina",
  "Moskvina",
  "Rudina",
  "Samsonova",
  "Batkina",
  "Grishina",
  "Usilova",
  "Filipova",
  "Khramova",
  "Tsvetkova",
  "Chazova",
  "Nemtseva",
  "Lyugashova",
  "Meladina",
  "Dezhnyova",
  "Yermolayeva",
  "Zhurova",
  "Malinovskya",
  "Gordievskya",
  "Vorapaeva",
  "Kryukova",
  "Stepnova",
  "Toropova",
  "Myasnikova",
  "Primakova",
  "Rezansova",
  "Chernova",
  "Shirmanova",
  "Osina",
  "Papanova",
  "Pomelova",
  "Kirsanova",
  "Lavrova",
  "Shmeleva",
  "Mirova",
  "Fomenkova",
  "Maltseva",
  "Burtsova",
  "Stezhenskya",
  "Fedorova",
  "Vasilievskya",
  "Turbina",
  ]; 
  const gn = givenNames[Math.floor(Math.random() * givenNames.length)];
  const sn = surnames[Math.floor(Math.random() * surnames.length)];
  return `${gn} ${sn}`;
};

class Witch {
  constructor() {
    this.rank = 0;
    this.promos = 0;
    this.guts = 0;
    this.luck = 0;
    this.skill = 0;
    this.medals = 0;
    this.regard = [];
    this.marks = [];
    this.moves = [];
  }
  updateBinding() {
    $("header h1").html(`<span class='rank'>${ranks[this.rank]} </span>${this.name}`);
    $("#nat_role").text(`${(this.nature != null ? this.nature.name : undefined)} ${(this.role != null ? this.role.name : undefined)}`);
    $(".role_desc").html(this.role != null ? this.role.desc : undefined);
    $("#guts span").text(formatStat(this.guts));
    $("#luck span").text(formatStat(this.luck));
    $("#skill span").text(formatStat(this.skill));
    $("#medals span").text(formatStat(this.medals));
    this.disableIf("#plusmedal", this.medals >= 4);

    const maxPromo = (this.nature != null ? this.nature.maxPromo : undefined) != null ? (this.nature != null ? this.nature.maxPromo : undefined) : 4;
    this.disableIf("#promoguts", (this.guts >= 3) || (this.promos >= maxPromo));
    this.disableIf("#promoluck", (this.luck >= 3) || (this.promos >= maxPromo));
    this.disableIf("#promoskill", (this.skill >= 3) || (this.promos >= maxPromo));

    const maxRegard = (this.nature != null ? this.nature.maxRegard : undefined) != null ? (this.nature != null ? this.nature.maxRegard : undefined) : 4;
    this.disableIf("#addregard", this.regard >= maxRegard);
    return this.disableIf("#changestation", (this.station != null) === true);
  }

  disableIf(el, cond) {
    if (cond) {
      return $(el).attr('disabled', 'disabled');
    } else {
      return $(el).removeAttr('disabled');
    }
  }

  rollStat(stat) {
    const d1 = Math.floor((Math.random() * 6) + 1);
    const d2 = Math.floor((Math.random() * 6) + 1);
    const newVal = d1 + d2 + this[stat];
    return $("footer p:first").html(`Rolled ${d1} + ${d2} + ${stat} = <strong>${newVal}</strong> (+1 if Regard applies)`); //.effect("highlight")
  }
  assignNature(nature) {
    this.nature = nature;
    return this.rebindNatureButtons();
  }
  updateNatureMoves() {
    $(".naturemove").remove();
    const moves = Array.from(this.nature.moves).map((m) =>
      Array.from(this.moves).includes(m.name) ?
        `<li class='naturemove ui-li-static ui-body-inherit'><h3>${m.name}</h3><p>${m.desc}</p></li>`
      :
        "");
    return $(".nm_header").after(moves.join(""));  
  }
  buildRegardSlots() {
    const maxRegard = this.nature.maxRegard != null ? this.nature.maxRegard : 4;
    const regardslots = $('.regard .ui-content ul');
    regardslots.empty();
    const vals = Array.from(feels).map((f) =>
      `<option>${f}</option>`);
    const v = vals.join("");
    for (let r of Array.from(this.regard)) {
      const r2 = `<li><div data-role='controlgroup' data-type='horizontal'><select>${v}</select><input type='text' data-wrapper-class='controlgroup-textinput ui-btn' placeholder='Person or airplane' /> </div></li>`;
      regardslots.append(r2);
      regardslots.find("div:last").controlgroup().find("select").val(r.feeling).selectmenu("refresh", true).end().find("input").val(r.target).textinput();
    }
    const reg = __range__(this.regard.length, maxRegard, false).map((i) =>
      "<li class='locked'>LOCKED</li>");
    return regardslots.append(reg.join(""));
  }
  rebindNatureButtons() {
    const moves = Array.from(this.nature.moves).map((m) =>
      Array.from(this.moves).includes(m.name) ?
        `<button class='addmove' value='${m.name}' disabled='disabled'><strong>${m.name}:</strong> ${m.desc}</button>`
      :
        `<button class='addmove' value='${m.name}'><strong>${m.name}:</strong> ${m.desc}</button>`);
    $("#adv_moves").html(moves.join(""));
    const marks = Array.from(this.nature.marks).map((mk) =>
      Array.from(this.marks).includes(mk) ?
        `<button disabled='disabled'>${mk}</button>`
      :
        `<button>${mk}</button>`);
    $("#adv_marks").html(marks.join(""));
    return this.buildRegardSlots();
  }
  save() {
    return localforage.setItem(this.name, JSON.stringify(this)).then(this.postsave());
  }
  postsave() {
    const existing = $(`.pcload[value='${this.name}']`);
    if (existing.length === 0) {
      const btn = `<li><button value='${this.name}' class='pcload ui-btn ui-shadow ui-corner-all'><small>${ranks[this.rank]}</small><br/>${this.name}</button></li>`;
      return $("#addNew").before(btn);
    } else {
      return existing.find("small").text(ranks[this.rank]);
    }
  }
      
  load(key) {
    return localforage.getItem(key).then(value => {
      const vals = JSON.parse(value);
      for (let k in vals) {
        const v = vals[k];
        this[k] = v;
      }
      this.rebindNatureButtons();
      this.updateNatureMoves();
      return this.updateBinding();
    });
  }
}

let pc = new Witch();

// on load?
const loadUI = function() {
  let k;
  const nat = (() => {
    const result = [];
    for (k in natures) {
      const v = natures[k];
      result.push(`<li><button value='${k}'>${v.name}</button></li>`);
    }
    return result;
  })();
  $("#chooseNature ul").html(nat.join(""));
  const uiroles = Array.from(roles).map((r, ri) =>
    `<li><button value='${ri}'>${r.name}</button></li>`);
  $("#chooseRole ul").html(uiroles.join(""));
  const chars = [];
  return localforage.iterate(function(c, k, num) {
    const cinfo = JSON.parse(c);
    chars.push(`<li><button value='${k}' class='pcload'><small>${ranks[cinfo.rank]}</small><br/>${cinfo.name}</button></li>`);
    }).then(() => $("#addNew").before(chars.join("")));
};

loadUI();

// event bindings
$(".stats button").on("click", function(e) {
  pc.rollStat($(this).attr("id"));
  return false;
});

$("#plusmedal").on("click", function(e) {
  // todo
  // visual feedback on this screen (fixed footer?)
  // OR switch and flash
  // idea -- overlay "Medals old --> new"
  // fade/shrink overlay after 2 seconds
  // play level up sound?
  location.hash = "char";
  pc.medals += 1;
  pc.updateBinding();
  pc.save();
  return false;
});

$("#promoguts").on("click", function(e) {
  location.hash = "char";
  pc.guts += 1;
  pc.rank += 1;
  pc.promos += 1;
  pc.updateBinding();
  pc.save();
  return false;
});

$("#promoluck").on("click", function(e) {
  location.hash = "char";
  pc.luck += 1;
  pc.rank += 1;
  pc.promos += 1;
  pc.updateBinding();
  pc.save();
  return false;
});

$("#promoskill").on("click", function(e) {
  location.hash = "char";
  pc.skill += 1;
  pc.rank += 1;
  pc.promos += 1;
  pc.updateBinding();
  pc.save();
  return false;
});



$("#addregard").on("click", function(e) {
  location.hash = "regard";
  const newSlot = {feeling: "love", target: ""};
  pc.regard.push(newSlot);
  const vals = Array.from(feels).map((f) =>
    `<option>${f}</option>`);
  const v = vals.join("");
  // TODO -- get rid of the JQM cruft
  const regardTemplate=`<div data-role='controlgroup' data-type='horizontal'> <select>${v}</select> <input type='text' data-wrapper-class='controlgroup-textinput ui-btn' placeholder='Person or airplane' /> </div>`;
  $(".regard li.locked:first").removeClass("locked").html(regardTemplate).find("div").controlgroup().find("select").selectmenu().end().find("input").textinput();
  pc.updateBinding();
  pc.save();
  return false;
});

// can only be taken once per campaign
$("#changestation").on("click", function(e) {
  pc.station = true;
  pc.updateBinding();
  pc.save();
  return location.hash = "char";
});

$(".harm li").on("click", function(e) {
  $(".harm li").removeClass("curr");
  $(this).addClass("curr");
  return false;
});

$(".marks").on("click", "button", function(e) {
  const val = $(this).text();
  pc.marks.push(val);
  $(this).attr("disabled", "disabled");
  pc.save();
  return false;
});

$("#adv_moves").on("click", ".addmove", function(e) {
  const val = $(this).attr("value");
  pc.moves.push(val);
  $(this).attr("disabled", "disabled");
  pc.save();
  pc.updateNatureMoves();
  return false;
});

$("#chooseNature button").on("click", function(e) {
  const nature = $(this).attr("value");
  pc.assignNature(natures[nature]);
  pc.updateBinding();
  location.hash = "chooseRankStats";
  return false;
});

$(".rank_0 button"). on("click", function(e) {
  pc.rank = 0;
  const [g, l, s] = Array.from($(this).attr("value").split(","));
  pc.guts = parseInt(g);
  pc.luck = parseInt(l);
  pc.skill = parseInt(s);
  pc.updateBinding();
  location.hash = "chooseName";
  return false;
});

$(".rank_1 button"). on("click", function(e) {
  pc.rank = 1;
  const [g, l, s] = Array.from($(this).attr("value").split(","));
  pc.guts = parseInt(g);
  pc.luck = parseInt(l);
  pc.skill = parseInt(s);
  pc.updateBinding();
  location.hash = "chooseName";
  return false;
});

$("#genName").on("click", e => $("#pcName").val(generateName));

$("#acceptName").on("click", function(e) {
    pc.name = $("#pcName").val();
    pc.updateBinding();
    location.hash = "chooseRole";
    return false;
});

$("#chooseRole button").on("click", function(e) {
  const role = $(this).attr("value");
  pc.role = roles[parseInt(role)];
  pc.updateBinding();
  pc.save();
  location.hash = "char";
  return false;
});

$("#addNew").on("click", function(e) {
  pc = new Witch();
  $("#pcName").val(generateName);
  location.hash = "chooseNature";
  return false;
});

$("#chooseChar ul").on("click", ".pcload", function(e) {
  pc = new Witch();
  const key = $(this).attr("value");
  pc.load(key);
  return location.hash = "char";
});

$(".regard ul").on("change", "input", function(e) {
  const index = $(this).closest("li").prevAll().length;
  pc.regard[index].target=$(this).val();
  pc.save();
  return false;
});

$(".regard ul").on("change", "select", function(e) {
  const index = $(this).closest("li").prevAll().length;
  pc.regard[index].feeling=$(this).val();
  pc.save();
  return false;
});

function __range__(left, right, inclusive) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}