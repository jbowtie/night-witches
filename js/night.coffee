document.title="Night Witches"

# function parens are optional
# first class functions
# if a is b; ( a === b)
# single line if:
# x() if cond

# for x in y; returns array of results

formatStat = (num) ->
  if num < 0
    "#{num}"
  else
    "+#{num}"

rollStat = (stat) ->
  d1 = Math.floor Math.random() * 6 + 1
  d2 = Math.floor Math.random() * 6 + 1
  newVal = d1 + d2 + pc[stat]
  $("footer p").text("Roll + #{stat} = #{newVal} (#{d1}, #{d2})")

ranks = ["Sgt", "Jr Lt", "Lt", "Sr Lt", "Captain", "Major"]

pc = 
  name: "Natasha", 
  rank: 3,
  guts: 1, luck: 0, skill: -1,
  medals: 0

$("header h1").html("<span class='rank'>#{ranks[pc.rank]} </span>#{pc.name}")
$("#guts span").text(formatStat pc.guts)
$("#luck span").text(formatStat pc.luck)
$("#skill span").text(formatStat pc.skill)
$("#medals span").text(formatStat pc.medals)
$(".stats button").on "click", (e) ->
  rollStat $(this).attr("id")
  false

