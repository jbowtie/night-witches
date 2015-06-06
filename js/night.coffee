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
    maxRegard: 3,
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
    $("#plusmedal").attr('disabled', 'disabled') if @medals >= 4
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
    $("footer p").text("Roll + #{stat} = #{newVal} (#{d1}, #{d2})")

pc = new Witch()
pc.name = "Natasha Romanov"
pc.nature = natures.hawk
pc.guts = 1
pc.skill = -1

# do this when nature selected
moves = for m in pc.nature.moves
  "<li><strong>#{m.name}:</strong> #{m.desc}</li>"
$("#adv_moves").html(moves.join "")

marks = for mk in pc.nature.marks
  "<button>#{mk}</button>"
$("#adv_marks").html(marks.join "")

# on load?
pc.updateBinding()

# event bindings
$(".stats button").on "click", (e) ->
  pc.rollStat $(this).attr("id")
  false

$("#plusmedal").on "click", (e) ->
  pc.medals += 1
  pc.updateBinding()
  false

$("#promoguts").on "click", (e) ->
  pc.guts += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false

$("#promoluck").on "click", (e) ->
  pc.luck += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false

$("#promoskill").on "click", (e) ->
  pc.skill += 1
  pc.rank += 1
  pc.promos += 1
  pc.updateBinding()
  false

$("#addregard").on "click", (e) ->
  pc.regard += 1
  vals = for f in feels
    "<option>#{f}</option>"
  v = vals.join ""
  $(".regard li.locked:first").removeClass("locked").html("<select id='feel-#{pc.regard}' data-mini='true' data-inline='true'>#{v}</select><input type='text' />")
  pc.updateBinding()
  false

# can only be taken once per campaign
$("#changestation").on "click", (e) ->
  $(this).attr("disabled", "disabled")

$(".harm li").on "click", (e) ->
  $(".harm li").removeClass("curr")
  $(this).addClass("curr")
  false

$(".marks button").on "click", (e) ->
  $(this).attr("disabled", "disabled").contents().wrap("<strike></strike>")
