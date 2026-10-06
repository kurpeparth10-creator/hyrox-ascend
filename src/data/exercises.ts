// Pose = [headX,headY, shoulderX,Y, hipX,Y, kneeX,Y, ankleX,Y, elbowX,Y, wristX,Y] in a 200x190 side-view box.
export const JOINTS=['h','s','p','k','a','e','w'] as const;
export type Joint=typeof JOINTS[number];
export const POSES:Record<string,number[]>={
stand:[100,32,100,52,100,98,100,140,100,178,100,78,100,102],
rack:[100,32,100,52,100,98,100,140,100,178,112,78,108,56],
squat:[96,60,88,82,62,128,108,128,92,178,104,100,116,84],
hinge:[122,66,108,80,66,106,82,142,86,178,110,112,108,138],
row:[122,66,108,80,66,106,82,142,86,178,92,98,104,102],
lunge:[100,50,98,72,92,128,128,134,132,178,106,100,112,84],
over:[100,34,100,54,100,98,100,140,100,178,100,32,100,10],
plankU:[26,96,44,104,118,130,166,150,190,176,48,140,50,174],
plankD:[28,128,46,134,118,142,166,156,190,176,70,150,50,174],
hang:[100,50,100,66,100,112,100,148,100,172,98,40,100,10],
chin:[100,22,100,40,100,86,100,122,100,150,92,52,100,10],
dipU:[90,40,86,60,76,108,110,130,130,178,84,86,84,112],
dipD:[92,66,88,86,78,126,112,144,130,178,70,100,84,112],
carry:[100,32,100,52,100,98,100,140,100,178,100,78,100,118],
sit:[76,82,78,102,68,150,118,140,130,178,104,118,128,120],
pull:[76,82,78,102,68,150,118,140,130,178,62,122,92,120],
nUp:[100,32,100,52,100,100,100,170,40,176,100,78,100,100],
nMid:[140,80,128,92,100,122,100,170,40,176,120,112,140,140],
nEnd:[160,150,148,152,100,142,100,170,40,176,150,160,160,172],
air:[100,20,100,40,100,84,116,108,100,132,106,66,116,58],
lean:[90,48,92,68,104,108,100,146,104,178,100,92,96,112]};
export type Exercise={id:string;name:string;station:string;poses:string[];captions:string[];checks:string[];callouts:[string,Joint][];prescription:string;why:string;
images:{start:string;mid:string;end:string;diagram:string;thumbnail:string}};
// Replace any image by editing its path here (or drop the file in public/images/exercises/<id>/). Missing files fall back to the built-in SVG illustration.
const raw:string[][]=[
["back-squat","Back Squat","Running","stand,squat,stand","Bar on upper back, feet shoulder width|Hips and knees bend together, chest up|Drive through the floor to stand tall","Feet about shoulder width|Brace core before descending|Knees track over toes|Reach controlled depth|Drive up through mid-foot","Spine:s,Knee:k,Hip:p,Foot:a","4 x 8 · rest 2 min","Builds leg strength and force output that carries across every running stride."],
["tibialis-raise","Tibialis Raise","Running","lean,stand,lean","Lean back on a wall, heels forward|Pull toes toward shins|Lower slowly under control","Back against wall, feet ahead|Straight legs, tall spine|Lift toes through full range|Pause at the top|Lower with control","Spine:s,Hip:p,Foot:a,Knee:k","3 x 15-20 · rest 60 s","Strengthens the shin muscles that absorb impact and help prevent shin overload."],
["deadlift","Deadlift","SkiErg","hinge,lean,stand","Hips back, flat back, bar over mid-foot|Bar close to legs as it passes the knees|Hips and shoulders lock out together","Bar over mid-foot|Flat neutral spine|Shoulders slightly ahead of bar|Push the floor away|Lock out without leaning back","Spine:s,Hip:p,Knee:k,Grip:w","4 x 5 · rest 2-3 min","Trains the hip hinge and posterior chain that power the SkiErg pull."],
["triceps-dip","Triceps Dip","SkiErg","dipU,dipD,dipU","Hands on bench, arms straight|Elbows bend back to about 90 degrees|Press back up to full extension","Shoulders down, away from ears|Elbows point back, not flared|Hips close to the bench|Lower to about 90 degrees|Press to full lockout","Shoulder:s,Elbow:e,Hip:p,Wrist:w","3 x 10-12 · rest 90 s","Builds the triceps that finish each SkiErg pull."],
["reverse-sled-drag","Reverse Sled Drag","Sled Push","lean,lean,lean","Face the sled, lean back, grip the straps|Walk backward with short strong steps|Stay tall and controlled each step","Slight backward lean, spine neutral|Short controlled steps|Knees stay soft|Drive through the front of the foot|Keep tension in the straps","Spine:s,Knee:k,Foot:a,Grip:w","4 x 20 m · rest 90 s","Loads quads and knees safely, supporting the leg drive needed for the sled push."],
["poliquin-step-down","Poliquin Step-Down","Sled Push","stand,lunge,stand","Stand on a step, working leg planted|Slowly lower the other heel toward the floor|Press back up to the start","Hips level|Knee tracks over toes|Lower slowly 3 sec|Heel stays planted|Stand tall at the top","Hip:p,Knee:k,Foot:a,Spine:s","3 x 10 per leg · rest 60 s","Builds knee control and single-leg strength for pushing the sled."],
["seated-rope-pull","Seated Rope Pull","Sled Pull","sit,pull,sit","Sit tall, arms reaching forward on the rope|Pull hand over hand, elbows drive back|Return with control","Sit tall, chest open|Core braced|Pull with elbows, not just hands|Shoulder blades squeeze|Control the return","Spine:s,Elbow:e,Grip:w,Hip:p","4 x 15 m · rest 90 s","Trains the back and grip pattern used to pull the sled toward you."],
["neutral-grip-chin-up","Neutral-Grip Chin-Up","Sled Pull","hang,chin,hang","Dead hang, arms straight, shoulders engaged|Pull elbows down until chin clears the bar|Lower fully with control","Palms face each other|Start from active hang|Pull elbows to ribs|Chin over the bar|Lower under control","Shoulder:s,Elbow:e,Grip:w,Core:p","4 x 5-8 · rest 2 min","Builds pulling strength for the sled pull and robust shoulders."],
["hurdle-hops","Hurdle Hops","Burpee Broad Jump","squat,air,squat","Quarter-squat, arms back|Explode up and forward, knees drive up|Land softly, absorb through hips and knees","Quarter-squat load|Swing arms to drive|Knees tuck to clear hurdle|Land softly on mid-foot|Reset before next hop","Hip:p,Knee:k,Foot:a,Spine:s","4 x 6 · rest 90 s","Develops elastic power for the broad jump portion of burpee broad jumps."],
["explosive-push-ups","Explosive Push-Ups","Burpee Broad Jump","plankU,plankD,plankU","Plank, body in one straight line|Lower chest to the floor under control|Press explosively up, hands may leave the floor","Hands under shoulders|Straight line head to heels|Core and glutes tight|Elbows about 45 degrees|Land soft with bent elbows","Spine:s,Elbow:e,Shoulder:s,Core:p","4 x 6 · rest 90 s","Builds pressing power for the repeated burpee push-up."],
["front-squat","Front Squat","Row","rack,squat,rack","Bar on front shoulders, elbows high|Sit between the hips, torso upright|Stand by driving elbows up","Elbows high|Torso upright|Core braced|Knees track over toes|Drive up through mid-foot","Spine:s,Elbow:e,Knee:k,Hip:p","4 x 6 · rest 2 min","Builds upright leg drive, the key to a powerful rowing stroke."],
["dumbbell-row","Dumbbell Row","Row","hinge,row,hinge","Hinge forward, flat back, arm hanging|Pull the dumbbell to your hip, elbow back|Lower to a full stretch","Flat back, hips hinged|Core braced|Pull elbow toward hip|Shoulder blade squeezes|Lower under control","Spine:s,Hip:p,Elbow:e,Grip:w","3 x 10 per arm · rest 60 s","Strengthens the lats and mid-back that finish the rowing pull."],
["single-arm-farmer-carry","Single-Arm Farmer Carry","Farmer Carry","carry,carry,carry","Pick up the weight, stand tall|Walk with short steps, no leaning|Set it down with control","Stand tall, ribs down|Shoulders level|Grip firm|Core resists side lean|Even steady steps","Spine:s,Shoulder:s,Grip:w,Core:p","4 x 30 m per side · rest 90 s","Trains grip and anti-lean core strength for the farmer carry."],
["snatch","Snatch","Farmer Carry","hinge,air,over","Wide grip, flat back, bar over mid-foot|Extend hips violently, shrug, pull under|Catch overhead with locked arms","Wide grip, flat back|Bar close to body|Full hip extension|Fast pull under the bar|Lock out overhead","Spine:s,Hip:p,Grip:w,Elbow:e","5 x 3 · rest 2 min","Builds explosive hips and full-body coordination plus grip endurance."],
["front-foot-elevated-split-squat","Front-Foot Elevated Split Squat","Sandbag Lunges","stand,lunge,stand","Front foot on plate, rear foot back|Lower back knee toward the floor|Drive through front heel to stand","Front foot flat on plate|Torso upright|Front knee tracks over toes|Back knee lowers under control|Drive up through front heel","Spine:s,Hip:p,Knee:k,Foot:a","3 x 8 per leg · rest 90 s","Builds single-leg strength and hip range for lunging under load."],
["dumbbell-walking-lunge","Dumbbell Walking Lunge","Sandbag Lunges","stand,lunge,stand","Stand tall holding dumbbells|Step long, lower back knee|Drive through the front foot into the next step","Tall posture|Long controlled step|Front knee tracks over toes|Back knee near the floor|Smooth push into next step","Spine:s,Knee:k,Hip:p,Grip:w","3 x 20 m · rest 90 s","Directly mirrors the sandbag lunge pattern and builds leg endurance."],
["clean","Clean","Wall Balls","hinge,air,rack","Hinge, flat back, bar over mid-foot|Extend hips and shrug, pull elbows high|Catch on front shoulders, elbows forward","Flat back at the start|Bar close to legs|Full hip extension|Fast elbows under the bar|Catch with elbows high","Spine:s,Hip:p,Elbow:e,Grip:w","5 x 3 · rest 2 min","Trains explosive hip drive that powers every wall ball throw."],
["push-press","Push Press","Wall Balls","rack,air,over","Bar on front shoulders, torso upright|Dip slightly, then drive hard through the legs|Press to lockout, head through","Elbows slightly forward|Short vertical dip|Drive with legs first|Press to full lockout|Ribs down, core braced","Elbow:e,Spine:s,Knee:k,Grip:w","4 x 5 · rest 2 min","Builds leg-to-arm power for throwing the ball overhead to the target."],
["nordic-hamstring-curl","Nordic Hamstring Curl","Bonus","nUp,nMid,nEnd","Kneel, ankles anchored, torso upright|Lower slowly, body straight from knees to head|Catch with hands, then push back up","Ankles securely anchored|Hips extended, not folded|Straight line knees to head|Lower as slowly as possible|Catch softly with hands","Spine:s,Hip:p,Knee:k,Foot:a","3 x 5 · rest 2 min","Builds hamstring strength and resilience for running and hinging."]];
export const exercises:Exercise[]=raw.map(r=>{const b=`/images/exercises/${r[0]}`;
return{id:r[0],name:r[1],station:r[2],poses:r[3].split(','),captions:r[4].split('|'),checks:r[5].split('|'),
callouts:r[6].split(',').map(c=>{const [l,j]=c.split(':');return [l,j as Joint] as [string,Joint]}),prescription:r[7],why:r[8],
images:{start:`${b}/start.webp`,mid:`${b}/mid.webp`,end:`${b}/end.webp`,diagram:`${b}/form.webp`,thumbnail:`${b}/thumb.webp`}}});
export const stations=['Running','SkiErg','Sled Push','Sled Pull','Burpee Broad Jump','Row','Farmer Carry','Sandbag Lunges','Wall Balls','Bonus'];
