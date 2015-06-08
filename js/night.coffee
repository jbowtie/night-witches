document.title="Night Witches"

# localStorage[key] for DOM storage

formatStat = (num) ->
  if num < 0
    "#{num}"
  else
    "+#{num}"


ranks = ["Sergeant", "Junior Lieutenant", " Lieutenant", "Senior  Lieutenant", "Captain", "Major"]
feels = ["love", "trust", "admire", "respect", "hate", "resent", "pity", "fear"]
natures =
  hawk: {
    name: "Hawk",
    moves:
      [
       {name: "Suka", desc: "You enjoy +1 ongoing when acting like a hooligan. When you act like a lady you are marked."},
       {name: "People’s Hero", desc: "Name the high-ranking official who has taken a personal interest in your career."},
       {name: "11.4 Meters Tip-to-Tip", desc: "When you want to land in some new place, you can ask “Is it remotely possible to land there?” and the GM will tell you. If the answer is yes, you don’t need to roll the Wheels Down move."},
       {name: "As Seen In Pravda", desc: "Use +medals instead of +guts when you Tempt Fate."},
       {name: "Miss Sverdlovsk 1939", desc: "Advance the first time you have sex with each of: a Senior Lieutenant, a Captain, a Major, a Lieutenant Colonel, or a Colonel."},]
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
  }
  owl: {
    name: "Owl",
    moves:
      [
       {name: "Suka", desc: "You enjoy +1 ongoing when acting like a hooligan. When you act like a lady you are marked."},
       {name: "People’s Hero", desc: "Name the high-ranking official who has taken a personal interest in your career."},
       {name: "11.4 Meters Tip-to-Tip", desc: "When you want to land in some new place, you can ask “Is it remotely possible to land there?” and the GM will tell you. If the answer is yes, you don’t need to roll the Wheels Down move."},
       {name: "As Seen In Pravda", desc: "Use +medals instead of +guts when you Tempt Fate."},
       {name: "Miss Sverdlovsk 1939", desc: "Advance the first time you have sex with each of: a Senior Lieutenant, a Captain, a Major, a Lieutenant Colonel, or a Colonel."},]
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
  }
  pigeon: {
    name: "Pigeon",
    moves:
      [
       {name: "Suka", desc: "You enjoy +1 ongoing when acting like a hooligan. When you act like a lady you are marked."},
       {name: "People’s Hero", desc: "Name the high-ranking official who has taken a personal interest in your career."},
       {name: "11.4 Meters Tip-to-Tip", desc: "When you want to land in some new place, you can ask “Is it remotely possible to land there?” and the GM will tell you. If the answer is yes, you don’t need to roll the Wheels Down move."},
       {name: "As Seen In Pravda", desc: "Use +medals instead of +guts when you Tempt Fate."},
       {name: "Miss Sverdlovsk 1939", desc: "Advance the first time you have sex with each of: a Senior Lieutenant, a Captain, a Major, a Lieutenant Colonel, or a Colonel."},]
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
  }
  raven: {
    name: "Raven",
    moves:
      [
        {name: "To Hell With Death", desc: "When you would be marked, name a player character who is marked instead if you wish."},
        {name: "Permanent File", desc: "When you submit an official report to your superiors, roll +skill. On a 10+, choose 2. On 7-9, choose 1: Mark someone; Change accepted truth of a situation; Add one to the mission pool"},
        {name: "Fortune’s Fool", desc: "Choose a single move. Replace the rolled stat with +Luck when you roll trigger it."},
        {name: "Voron", desc: "When you steal a treasured possession from someone, they are marked. If the “treasured possession” is their lover or their future, advance."},
        {name: "Sacrifice", desc: "When you are sent to the hospital to recover from combat injuries, you may choose your assignment, squadron, section and aircraft when you return."},]
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
  }
  sparrow: {
    name: "Sparrow",
    moves:
      [
        {name:"Dark Bargain", desc: "You can elect to be marked in order to remove all harm from yourself or another."},
        {name:"Ghosts", desc: "Choose a dead comrade and hold three. When you ask your friend for help, spend your holds one for one to succeed as if you had rolled a 10+. Every time you do this you are also harmed or marked by the experience, your choice. "},
        {name:"Transcendent Love", desc: "Choose your one and only lover.  Your bond is unshakable. The first time you take the mark “Embrace Death”, immediately erase it."},
        {name:"Murky Past", desc: "You guard your history carefully. Choose two things you are hiding: Valuable training, prominent family, political connections, a strange secret, portable wealth. Define them whenever you want. Reveal either of these aspects of your past to save the day, make an impression or ruin someone."},
        {name:"Ambition", desc: "Once per duty station, do something explicitly against orders, then Tempt Fate and advance."},]
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

class Witch
  constructor: ->
    @rank = 0
    @promos = 0
    @guts = 0
    @luck = 0
    @skill = 0
    @medals = 0
    @regard = 0
  updateBinding: ->
    $("header h1").html("<span class='rank'>#{ranks[@rank]} </span>#{@name}")
    $("#nat_role").text("#{@nature.name} Zealot")
    $("#guts span").text(formatStat @guts)
    $("#luck span").text(formatStat @luck)
    $("#skill span").text(formatStat @skill)
    $("#medals span").text(formatStat @medals)
    if @medals >= 4
      $("#plusmedal").attr('disabled', 'disabled') 
    else
      $("#plusmedal").removeAttr('disabled')
    maxPromo = @nature.maxPromo ? 4
    $("#promoguts").attr('disabled', 'disabled') if @guts >= 3 or @promos >= maxPromo
    $("#promoluck").attr('disabled', 'disabled') if @luck >= 3 or @promos >= maxPromo
    $("#promoskill").attr('disabled', 'disabled') if @skill >= 3 or @promos >= maxPromo
    maxRegard = @nature.maxRegard ? 4
    $("#addregard").attr('disabled', 'disabled') if @regard >= maxRegard
  rollStat: (stat) ->
    d1 = Math.floor Math.random() * 6 + 1
    d2 = Math.floor Math.random() * 6 + 1
    newVal = d1 + d2 + @[stat]
    $("footer p:first").html("Rolled #{d1} + #{d2} + #{stat} = <strong>#{newVal}</strong>") #.effect("highlight")
  assignNature: (@nature) ->
    moves = for m in @nature.moves
      "<button class='addmove'><strong>#{m.name}:</strong> #{m.desc}</button>"
    $("#adv_moves").html(moves.join "")
    marks = for mk in @nature.marks
      "<button>#{mk}</button>"
    $("#adv_marks").html(marks.join "")
    maxRegard = @nature.maxRegard ? 4
    regardslots = $('.regard .ui-content ul')
    for i in [0...maxRegard]
      $("<li class='locked'>LOCKED</li>").appendTo(regardslots)
    
pc = new Witch()
pc.name = "Natasha Romanov"
pc.assignNature(natures.hawk)
pc.guts = 1
pc.skill = -1

# on load?
pc.updateBinding()

# event bindings
$(".stats button").on "click", (e) ->
  pc.rollStat $(this).attr("id")
  false

$("#plusmedal").on "click", (e) ->
  # todo
  # visual feedback on this screen (fixed footer?)
  # OR switch and flash
  # idea -- overlay "Medals old --> new"
  # fade/shrink overlay after 2 seconds
  # play level up sound?
  location.hash = "char"
  pc.medals += 1
  pc.updateBinding()
  false

$("#promoguts").on "click", (e) ->
  location.hash = "char"
  pc.guts += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false

$("#promoluck").on "click", (e) ->
  location.hash = "char"
  pc.luck += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false

$("#promoskill").on "click", (e) ->
  location.hash = "char"
  pc.skill += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false



$("#addregard").on "click", (e) ->
  location.hash = "regard"
  pc.regard += 1
  vals = for f in feels
    "<option>#{f}</option>"
  v = vals.join ""
  # TODO -- get rid of the JQM cruft
  regardTemplate="<div data-role='controlgroup' data-type='horizontal'> <select>#{v}</select> <input type='text' data-wrapper-class='controlgroup-textinput ui-btn' placeholder='Person or airplane' /> </div>"
  $(".regard li.locked:first").removeClass("locked").html(regardTemplate).find("div").controlgroup().find("select").selectmenu().end().find("input").textinput()
  pc.updateBinding()
  false

# can only be taken once per campaign
$("#changestation").on "click", (e) ->
  $(this).attr("disabled", "disabled")
  location.hash = "char"

$(".harm li").on "click", (e) ->
  $(".harm li").removeClass("curr")
  $(this).addClass("curr")
  false

$(".marks button").on "click", (e) ->
  $(this).attr("disabled", "disabled").contents().wrap("<strike></strike>")
