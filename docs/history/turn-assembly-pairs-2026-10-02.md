# Turn assembly — served vs assembled pairs (shadow, 2026-10-02)

For the owner's hand-read (spec §7 gate: the assembled turn no worse in a majority of 30 pairs).
All pairs come from disposable QA accounts driven by `scripts/qa/shadowSampleRun.ts`. They are tutor
text only. "Assembled" is what serve mode would have sent; the student got "Served".

**Caveat:** these pairs predate two fixes (commit after `6e2d984b`):
- a wrong answer no longer gets distractor-text fallback;
- V5 now checks only the previous card.

Pairs marked FALLBACK show the old fallback behaviour.

## 1. `chem.found.mole-concept`

**Served:**

> That’s correct — you divided the number of CO₂ molecules by Avogadro’s number, because converting **particles → moles** always uses division, and the result (0.5 mol) is smaller than the original particle count, as expected.
> 
> **How did you figure that out?** 
> 
> Now, let’s give a name to the step you just used. The operation “divide by Avogadro’s number” (or “multiply by it” when going the other way) is called a **conversion factor**. It’s the constant that lets us move between the counting world of particles and the macroscopic world of moles, just as the figure on your screen shows the bridge from “Number of Particles” to “Moles”. Whenever you need to go from particles to moles, apply the conversion factor by dividing; to go from moles to particles, multiply.
> 
> When you’re ready for another practice conversion, just let me know!

**Assembled:**

> That's right.
> 
> You correctly divided the number of molecules by Avogadro's constant, showing the right conversion from particles to moles. The result of 0.5 mol matches the expected small mole value for a large particle count.
> 
> When you need to go the opposite way—moles to particles—just multiply by 6.022 × 10²³. Remember: particles are huge numbers, moles are comparatively tiny, so division shrinks and multiplication expands.
> 
> One to try. There's no rush.

Better: [ ] served  [ ] assembled  [ ] same

## 2. `chem.found.mole-concept`

**Served:**

> That's right. Here’s a quick practice you can try using the bridge diagram you’re looking at. Focus on the box that says **“Divide by Molar Mass (g / mol) to get”** – that’s the step that turns a mass into moles.
> 
> Take a sample of **3.0 g of carbon‑12**. First, divide the mass by carbon’s molar mass (12 g / mol) to find the number of moles, then multiply the resulting moles by Avogadro’s number (6.022 × 10²³) to obtain the number of atoms.
> 
> Work through those two steps and let me know the number of carbon atoms you calculate.

**Assembled:**

> That's right.
> 
> You chose No because equal masses of different substances do not give equal numbers of molecules; water and glucose have different molar masses.
> 
> To compare any two samples, first change grams to moles using each substance’s molar mass, then multiply by Avogadro’s number to see how many molecules each contains.

Better: [ ] served  [ ] assembled  [ ] same

## 3. `chem.found.mole-concept`

**Served:**

> Not quite — the answer is: 3.01 × 10²³
> 
> The number 0.500 represents the amount of substance in moles, but it does not tell you how many helium atoms are actually present. To find the number of atoms you must use Avogadro’s number, which is the fixed count of particles in one mole: \(6.022 \times 10^{23}\) particles per mole. The relationship is Number of particles = moles × Avogadro’s number. So for 0.500 mol of helium: 
> 
> \(0.500\ \text{mol} \times 6.022 \times 10^{23}\ \text{atoms mol}^{-1} = 3.01 \times 10^{23}\) atoms. This is why the correct answer is \(3.01 \times 10^{23}\) atoms. You were close to the right idea—recognizing the 0.500 mol—but the extra multiplication step with Avogadro’s number is essential to convert moles into actual particle counts.

**Assembled:**

> Not quite — the answer is: 3.01 × 10²³
> 
> You gave the amount in moles instead of converting to atoms. The number of atoms is found by multiplying moles by Avogadro's constant.
> 
> Multiply 0.500 mol by 6.02 × 10²³ mol⁻¹. The calculation 0.500 × 6.02 × 10²³ gives 3.01 × 10²³ atoms. This shows how moles link to actual particle counts.
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 4. `chem.found.mole-concept`

**Served:**

> That's right. Great, let’s see how you can apply the mole concept and Avogadro’s number to a new situation.

**Assembled:**

> That's right.
> 
> You chose the right answer because the atomic mass unit describes the mass of one atom while the molar mass describes the mass of a whole mole of atoms.
> 
> The mole links the microscopic and macroscopic worlds. Avogadro's number is defined so that the mass of one mole of carbon‑12 equals exactly 12 grams, making the numerical values match but the quantities remain different.
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 5. `chem.found.significant-figures`

**Served:**

> That answer isn’t right. When we add or subtract numbers, we don’t count all the digits; we look at how many **decimal places** each addend is reliable to. The result can only be trusted to the fewest decimal places among the numbers you’re adding. So “5 (count all digits)” applies to the multiplication rule, not to addition.
> 
> For example, if you add 2.34 g + 0.5 g, the second number is only reliable to the tenths place, so the sum must be rounded to the tenths place as well: 2.8 g, not 2.84 g. The rule is about the **position of the decimal point**, not the total count of digits.

**Assembled:**

> Not quite — the answer is: 3 (the 4, 7, and trailing 0 after decimal count; leading zeros are placeholders)
> 
> The leading zeros are only placeholders and do not count as significant figures. The trailing zero after the decimal is significant, giving three significant figures.
> 
> When a zero appears after a non‑zero digit and to the right of a decimal point, it is considered significant because it indicates measured precision.
> 
> One to try. There's no rush.

Better: [ ] served  [ ] assembled  [ ] same

## 6. `chem.found.significant-figures` — FALLBACK

**Served:**

> That’s correct — the “3” is an exact count, so it doesn’t limit the significant figures; the product keeps the two sig figs from the measured 2.5 cm. 
> 
> Let's check this one before we go further.

**Assembled:**

> That's right.
> 
> 7.5 cm, to 2 significant figures. The 3 is an EXACT number: it comes from counting, not from measuring, so it carries infinite significant figures and never limits the result. The same is true of defined conversions such as 1 km = 1000 m exactly. Only MEASURED values limit precision
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 7. `chem.found.significant-figures`

**Served:**

> That’s correct — you kept only one decimal place because the sum is limited by the fewest decimal places among the numbers you added.

**Assembled:**

> That's right.
> 
> You applied the rule that the result is rounded to the same number of decimal places as the term with the fewest decimal places
> 
> When adding or subtracting, count the decimal places of each number. The final answer must be rounded to the smallest count of decimal places among the addends. This keeps the precision consistent and avoids implying greater accuracy than the data provides.
> 
> One to try. There's no rush.

Better: [ ] served  [ ] assembled  [ ] same

## 8. `chem.found.measurement`

**Served:**

> That answer isn’t correct. The mistake is thinking that because the readings are consistent, they must also be close to the true value. Precision refers only to how tightly the measurements cluster together; it says nothing about whether they hit the correct target.
> 
> In this case the five boiling‑point readings (102.1 °C, 102.0 °C, 102.1 °C, 102.0 °C, 102.1 °C) are tightly grouped, so they are **precise**. However, the true boiling point of water is 100.0 °C, and all the measurements are about two degrees higher, so they are **not accurate**. Thus the correct description is “precise but not accurate.”

**Assembled:**

> Not quite — the answer is: Precise but not accurate — tightly clustered but far from the true value
> 
> The measurements are tightly grouped, showing good precision, but they are all about 2 °C higher than the true boiling point, so they are not accurate. Accuracy refers to closeness to the true value, while precision refers to consistency among repeated measurements.
> 
> When results are consistently off in the same direction, a systematic error is present. This shifts all measurements away from the true value, reducing accuracy but leaving precision unchanged. Random errors cause spread in the data, lowering precision. Identifying and correcting systematic errors improves accuracy without affecting precision.
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 9. `chem.found.measurement`

**Served:**

> Your reply was about leading zeros, which doesn’t address the flow‑chart question (it was asking what you notice about the order of the six steps).
> 
> <!" a="milli" b="micro" c="nano" d="centi" correct="A"-->

**Assembled:**

> That's right.
> 
> You recognized that the zeros before the first non‑zero digit are leading zeros and do not count as significant. The final zero after the decimal point is a trailing zero, which is significant. Thus the number 0.0450 g has three significant figures.
> 
> When writing numbers in scientific notation, all digits in the coefficient are significant. For example, 0.0450 g can be expressed as 4.50×10⁻² g, making it clear that the three digits 4, 5, and 0 are all significant. This format avoids ambiguity about which zeros count.

Better: [ ] served  [ ] assembled  [ ] same

## 10. `chem.found.measurement`

**Served:**

> Not quite — the answer is: 25,000 mg (0.025 kg × 1000 g/kg × 1000 mg/g)
> 
> Moving the decimal three places only changes kilograms to grams, but the target unit is milligrams, which are a thousand times smaller than a gram. Here’s why the full conversion works step by step:
> 
> 1. Start with 0.025 kilograms. 2. Convert kilograms to grams: 1 kilogram = 1000 grams, so 
>  \(0.025 \text{kg} × \frac{1000 \text{g}}{1 \text{kg}} = 25 \text{g}\). The kilograms cancel, leaving grams. 3. Convert grams to milligrams: 1 gram = 1000 milligrams, so 
>  \(25 \text{g} × \frac{1000 \text{mg}}{1 \text{g}} = 25 000 \text{mg}\). The grams cancel, leaving milligrams. So the correct result is **25 000 milligrams**, not 25 mg.

**Assembled:**

> Not quite — the answer is: 25,000 mg (0.025 kg × 1000 g/kg × 1000 mg/g)
> 
> You moved the decimal only three places, but converting kilograms to milligrams requires multiplying by 1,000,000, not 1,000. The extra factor of 1,000 was missed.
> 
> Remember the chain: 1 kg = 1,000 g and 1 g = 1,000 mg, so 1 kg = 1,000 × 1,000 mg = 1,000,000 mg. Multiply the kilogram value by 1,000,000 to get milligrams.
> 
> One to try. There's no rush.

Better: [ ] served  [ ] assembled  [ ] same

## 11. `chem.found.measurement`

**Served:**

> That’s correct— 0.250 dm³ is the right conversion because 1 dm³ equals 100 cm³, so dividing 250 cm³ by 100 gives 2.5 × 10⁻¹ dm³. 
> 
> Now let’s move on to the next step in the measurement process.
> 
> Take a look at the labelled figure beside this message — it shows Physical Quantities and SI Units. Study it while I explain.

**Assembled:**

> That's right.
> 
> You used the conversion 1 dm³ = 1000 cm³ and divided 250 cm³ by 1000, giving 0.250 dm³. The idea is converting between cubic units by scaling the linear factor cubed.
> 
> Remember that when you change length units, the volume changes by the cube of that factor. For example, 1 m = 10 dm, so 1 m³ = 10³ = 1000 dm³. Apply the same rule for any other unit pair.
> 
> One to try. There's no rush.

Better: [ ] served  [ ] assembled  [ ] same

## 12. `chem.found.pure-substances`

**Served:**

> I’m sorry, that answer isn’t correct. 
> 
> A pure substance has one specific, sharp melting point that doesn’t change no matter where the sample comes from. Because the composition is fixed, the temperature at which it turns from solid to liquid is always the same. 
> 
> A mixture contains more than one component, so its overall composition can vary. Different proportions of the components cause the mixture to begin melting at one temperature and finish melting at another, giving a range of melting temperatures. 
> 
> Understanding this difference helps us tell pure substances and mixtures apart, and it tells us which separation technique to use later on. 
> 
> Feel free to let me know if anything is still unclear.

**Assembled:**

> Not quite — the answer is: sharp, fixed … over a range of temperatures
> 
> Pure substances melt at a single, sharp temperature, not over a range. Mixtures do not have one fixed point; they melt over a range of temperatures. Your answer reverses these facts.
> 
> When different substances are mixed, each component begins to melt at its own temperature, so the overall mixture softens gradually. This creates a melting range, unlike a pure compound which changes state all at once at its specific melting point.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 13. `chem.found.pure-substances`

**Served:**

> That’s correct—water is a chemical compound, so it’s a pure substance because its composition (two hydrogen atoms bonded to one oxygen atom) is fixed and its physical properties, like boiling point, are uniform. 
> 
> Whenever you see a material that always melts or boils at the same temperature regardless of where it came from, you can be confident it’s a pure substance rather than a mixture. 
> 
> Whenever you’re ready, just let me know and we can move on to the next step in the process.

**Assembled:**

> That's right.
> 
> Water is a compound because hydrogen and oxygen atoms are chemically bonded in a fixed ratio. This makes it a pure substance, not a mixture. The elements cannot be separated without a chemical reaction.
> 
> A compound always has the same composition throughout, so any sample of water has the same 2:1 hydrogen‑oxygen ratio. In contrast, a mixture contains parts that keep their own identities and can be separated by physical means such as filtering or evaporating.

Better: [ ] served  [ ] assembled  [ ] same

## 14. `chem.found.pure-substances`

**Served:**

> Not quite — the answer is: No — filtration separates an INSOLUBLE solid from a liquid by particle size, and dissolved salt passes straight through the filter paper with the water. Evaporation (or distillation, if you also want the water back) is the technique that matches this mixture, because it separates by boiling point instead
> 
> Let’s see if you can spot a pure substance among a few common examples.

**Assembled:**

> Not quite — the answer is: No — filtration separates an INSOLUBLE solid from a liquid by particle size, and dissolved salt passes straight through the filter paper with the water. Evaporation (or distillation, if you also want the water back) is the technique that matches this mixture, because it separates by boiling point instead
> 
> A pure substance indeed shows one fixed boiling point regardless of its origin
> 
> If another substance is present, the mixture’s boiling point changes. This is why adding salt to water raises its boiling point and why distillation can separate components based on their different boiling points.
> 
> Quick check. Think it through before you choose.

Better: [ ] served  [ ] assembled  [ ] same

## 15. `chem.found.pure-substances` — FALLBACK

**Served:**

> Correct—carbon dioxide (CO₂) is a pure substance because it has a fixed chemical composition and consistent properties.

**Assembled:**

> That's right.
> 
> fixed composition, one formula
> 
> Quick check. Think it through before you choose.

Better: [ ] served  [ ] assembled  [ ] same

## 16. `phys.meas.vector-products`

**Served:**

> I see where the idea came from, but it’s not quite right. Work isn’t about how hard you push or how long you lean; it’s the dot product of the force \( \mathbf{F} \) and the displacement \( \mathbf{d} \). In the picture, the wall doesn’t move, so the displacement vector is zero. A dot product with a zero vector always gives zero, no matter how large the force is. That’s why the correct answer is exactly zero joules.
> 
> If you’d like another example to see how the dot product works in a different situation, just let me know.

**Assembled:**

> Not quite — the answer is: Exactly zero — work is a dot product F·d, and with zero displacement (or force perpendicular to any motion), there is no aligned component to produce work, regardless of how large the force is
> 
> You assumed that pushing harder or longer automatically creates work, but work is force times displacement in the direction of the force. The wall does not move, so displacement is zero and the work done on the wall is zero.
> 
> If the wall stayed still, all the energy you expend becomes internal strain or heat in your muscles, not mechanical work on the wall. Only when an object actually moves in the direction of the applied force is mechanical work transferred to it.
> 
> Quick check. Think it through before you choose.

Better: [ ] served  [ ] assembled  [ ] same

## 17. `phys.meas.vector-products`

**Served:**

> That's right. That’s spot‑on—the dot product yields a scalar (no direction), while the cross product yields a vector that points perpendicular to both original vectors. This follows directly from what each product measures: alignment for the dot product and the area‑swept‑out (and its perpendicular direction) for the cross product. 
> 
> Whenever you’re ready, let me know and we can move on to a short practice problem together.
> 
> Take a look at the vector beside this message — it shows Dot and Cross Products. Follow it step by step.

**Assembled:**

> That's right.
> 
> The dot product combines two vectors into a scalar, so work has no direction. The cross product produces a vector perpendicular to the input plane, giving torque a genuine direction. This reflects the fundamental difference between the two products.
> 
> Remember that the dot product equals |A||B|cosθ and measures how much one vector projects onto another. The cross product equals |A||B|sinθ and points along the axis given by the right‑hand rule, representing the area of the parallelogram spanned by the vectors.

Better: [ ] served  [ ] assembled  [ ] same

## 18. `phys.meas.vector-products` — FALLBACK

**Served:**

> That’s correct—you multiplied the two magnitudes and the cosine of the 60° angle, which is precisely how the dot product is evaluated, and it always produces a single number (a scalar).

**Assembled:**

> That's right.
> 
> 3 × 2 × cos60 = 3 J, a scalar — the dot product uses cosine and always gives a number.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 19. `phys.meas.vector-addition`

**Served:**

> Your answer isn’t correct. 
> 
> You assumed the two forces simply add their sizes, giving 10 newtons, which ignores their directions. That’s the common mistake of treating vector magnitudes like ordinary numbers. 
> 
> In fact, the two 5‑newton forces point exactly opposite each other. When you place the tail of one at the head of the other (the head‑to‑tail method), the arrows line up back‑to‑back and the closing side of the triangle has zero length. So the resultant force on the box is 0 newtons. 
> 
> Here's a question — take your time with it.

**Assembled:**

> Not quite — the answer is: 0 N — the two equal, oppositely-directed forces cancel completely; combining two nonzero vectors can produce a result smaller than either one, even exactly zero
> 
> The forces point opposite each other, so they subtract instead of add; equal opposite forces cancel to zero net force. Adding vectors can give a result smaller than each individual vector.
> 
> Draw each force as an arrow. Place the tail of the second arrow at the head of the first. If the arrows are the same length but point opposite ways, the final arrow collapses to a point, showing that the object feels no overall push.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 20. `phys.meas.vector-addition`

**Served:**

> That's right. QA shadow-sample, notice how the green vector labeled "A (3 at 0°)" and the blue vector labeled "B (4 at 90°)" on your screen start together at the origin. When we slide the blue vector over so its tail sits right on the tip of the green vector, we form a triangle whose closing side is the red vector labeled "R (5 at 53.1°)". That red vector is the resultant, combining both direction and magnitude.

**Assembled:**

> That's right.
> 
> You used the Pythagorean theorem for perpendicular forces. The forces form a right triangle with sides 3 and 4. The hypotenuse gives the resultant magnitude.
> 
> The direction of the resultant can be found with the tangent function. The angle north of east satisfies tanθ=4/3, giving θ≈53 degrees. This shows how both magnitude and direction follow from vector components.

Better: [ ] served  [ ] assembled  [ ] same

## 21. `phys.meas.vector-addition`

**Served:**

> Not quite — the answer is: 5 N — vectors at an angle combine via the Pythagorean/triangle rule, not simple addition
> 
> That’s a common slip—adding just the numbers treats the forces like plain scalars, but forces are vectors, so their directions matter.
> 
> In the picture, the green arrow **A** (3 N at 0°) points east and the blue arrow **B** (4 N at 90°) points north. When you place **B** tip‑to‑tail on **A**, they form a right‑angled triangle. The straight‑line side that closes the triangle is the red arrow **R**, whose length is found with the Pythagorean theorem: √(3² + 4²) = 5 N. Its direction comes from the angle of that side, about 53° measured from the eastward axis (northeast).
> 
> So the resultant isn’t 7 N; it’s 5 N pointing toward the northeast because both magnitude and direction combine geometrically.

**Assembled:**

> Not quite — the answer is: 5 N — vectors at an angle combine via the Pythagorean/triangle rule, not simple addition
> 
> You added the magnitudes directly ignoring the right‑angle relationship. The angle changes how the forces combine.
> 
> For perpendicular vectors, treat them as the legs of a right triangle. The resultant is the hypotenuse, found with R = √(A²+ B²). In this case √(3²+4²)=5 N, and the direction is halfway between the two, at 45° to each.
> 
> Quick check. Think it through before you choose.

Better: [ ] served  [ ] assembled  [ ] same

## 22. `phys.meas.vector-addition`

**Served:**

> That’s correct—you identified the resultant as 5 newtons toward the north‑east because the two perpendicular forces form a right‑triangle whose hypotenuse gives that magnitude and direction.

**Assembled:**

> That's right.
> 
> You added the east and north forces as a right‑angle triangle. Using the Pythagorean theorem gives √(3²+4²)=5 N, and the direction is exactly between east and north, i.e., north‑east.
> 
> To find the exact direction, use the tangent function: tan θ = opposite/adjacent = 4/3, so θ ≈ 53.1° north of east. This method works for any two perpendicular forces.
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 23. `phys.meas.significant-figures`

**Served:**

> Your answer of three significant figures isn’t correct. When we multiply numbers, the result can’t be reported with more significant figures than the *least* precise factor. Here 2.5 has only two significant figures, while 3.42 has three, so the product must be limited to two significant figures. Multiplying gives 8.55, which we round to **8.6** (two significant figures).

**Assembled:**

> Not quite — the answer is: Two — a product carries the precision of its LEAST precise input
> 
> The result must have the same number of significant figures as the factor with the fewest, which is 2.5 with two figures, so two sig figs are required.
> 
> When multiplying or dividing, count the significant figures in each number and round the product to the smallest count. This keeps the precision consistent with the least precise measurement.
> 
> Quick check. Think it through before you choose.

Better: [ ] served  [ ] assembled  [ ] same

## 24. `phys.meas.significant-figures`

**Served:**

> That’s right—you can only trust the digits that the millimetre‑limited measurement can actually provide. Because the ruler’s smallest division is 1 mm, the length is known only to the nearest 0.1 cm, so any finer digits in the calculated area are just arithmetic noise.
> 
> Now let’s look at how we decide what counts as a significant figure when zeros appear in a number. Zeros that sit **between** non‑zero digits are always significant (they’re “captive” zeros). A zero that comes **before** the first non‑zero digit is just a placeholder and isn’t significant (a “leading” zero). A zero that follows a decimal point **after** a non‑zero digit is significant because the decimal point tells us the measurement was made to that place.
> 
> Take the number 4.370 cm shown in the figure. The “4” and “3” are certain, the “7” is an estimated last digit, and the trailing “0” after the decimal point is also significant—it tells us the measurement was made to the thousandths place. That’s why the figure notes “sig. figs = 3” (the zero isn’t counted because it’s part of the same decimal‑place precision as the “7”).
> 
> When you feel ready, let me know what you notice about the zeros in the next number we’ll 

**Assembled:**

> That's right.
> 
> You recognized that the number of reliable digits is limited by the precision of the original measurement. The ruler gives only three significant figures, so any extra digits are just calculation noise.
> 
> When you use measured values in further calculations, keep only as many decimal places as the least precise measurement. This avoids implying a higher accuracy than the data actually provides.

Better: [ ] served  [ ] assembled  [ ] same

## 25. `phys.meas.significant-figures`

**Served:**

> Not quite — the answer is: 3 in 0.00420 (leading zeros don't count, trailing zero after decimal does); 4 in 4002 (embedded zeros count)
> 
> When we count significant figures, we don’t treat every digit that appears as meaningful. The leading zeros in 0.00420 are only placeholders—they tell us where the decimal point is, but they were not measured. Only the “4”, “2”, and the final “0” after the decimal are significant, so 0.00420 has **3 significant figures**. In 4002, the zeros are between non‑zero digits. Those “captive” zeros are measured and therefore count. All four digits (4, 0, 0, 2) are significant, giving **4 significant figures**. So the correct counts are 3 sig figs for 0.00420 and 4 sig figs for 4002.

**Assembled:**

> Not quite — the answer is: 3 in 0.00420 (leading zeros don't count, trailing zero after decimal does); 4 in 4002 (embedded zeros count)
> 
> You counted the leading zeros in 0.00420 as significant, but leading zeros are only placeholders and are not counted. The trailing zero after the decimal is significant, giving three significant figures. The zeros in 4002 are internal and are counted, giving four significant figures.
> 
> Remember: ignore zeros before the first non‑zero digit, count zeros between non‑zero digits, and count any zero after a decimal point that follows a non‑zero digit.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 26. `phys.meas.significant-figures`

**Served:**

> Correct — you should keep two significant figures.
> 
> Because the original measurement (2.5 cm) is known to only two significant figures, the result cannot be reported with greater precision.

**Assembled:**

> That's right.
> 
> You kept two significant figures because the original measurement 2.5 cm has only two significant figures, so the product must be rounded to the same precision.
> 
> When you multiply or divide, the result should have as many significant figures as the measurement with the fewest. This rule also applies to addition or subtraction, but there you match the smallest number of decimal places instead.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 27. `phys.meas.errors`

**Served:**

> Your answer isn’t correct—averaging many measurements doesn’t cut down both types of error equally. 
> 
> The idea that “both kinds, equally” is wrong because systematic error is a consistent offset that appears in every single reading. Since every measurement is shifted by the same amount, adding them together and dividing by the number of readings just gives you a more precise version of that shifted value; the bias remains unchanged. 
> 
> Averaging does help with random error, though. Random errors make the individual readings scatter above and below the true value. When you take many such scattered results, the positive and negative deviations tend to cancel, so the mean gets closer to the true value and the random spread becomes smaller. That’s why the correct answer is **random error only**. 
> 
> Take a moment to let this distinction settle, and we’ll keep building on it.

**Assembled:**

> Not quite — the answer is: Random error only — systematic error survives averaging completely untouched
> 
> Averaging many measurements smooths out the scatter caused by random fluctuations, but it does not change a consistent offset that is present in every reading.
> 
> To lower systematic error you must change the measurement setup, calibrate the instrument, or apply a correction factor, because repeating the same biased measurement will keep the bias.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same

## 28. `phys.meas.errors` — FALLBACK

**Served:**

> That's correct — the stopwatch error is systematic because it shifts every measurement by the same amount, while the scatter from pressing the timer at slightly different moments is random because it varies from trial to trial. Let me know when you’d like to continue.
> 
> Take a look at the labelled figure beside this message — it shows Measurement Errors and Uncertainty. Follow it step by step.

**Assembled:**

> That's right.

Better: [ ] served  [ ] assembled  [ ] same

## 29. `phys.meas.errors`

**Served:**

> Not quite — the answer is: Precise but NOT accurate — the readings cluster tightly together (precision), but they are all systematically offset from the true value (inaccurate)
> 
> But the key idea we covered is that **precision** and **accuracy** are independent qualities. *Precision* describes how closely repeated measurements agree with each other. In this case the three rulers all read **12.41 cm**, so their results are tightly clustered—that’s precise. *Accuracy* describes how close the measurements are to the **true value**. Because each ruler’s zero mark is shifted **2 mm** forward, every reading is **2 mm too high**. Even though the three readings match each other, they are all offset from the true length, so they are **not accurate**. Therefore the correct description is **“precise but NOT accurate.”**

**Assembled:**

> Not quite — the answer is: Precise but NOT accurate — the readings cluster tightly together (precision), but they are all systematically offset from the true value (inaccurate)
> 
> The three rulers all give the same value, which shows precision, but they all start 2 mm beyond the true zero, so the measurements are not close to the true length. This systematic offset means the readings are inaccurate.
> 
> Precision is about the consistency of repeated measurements, while accuracy is about how close a measurement is to the real value. Even if all measurements agree (high precision), a constant bias can make them inaccurate. Recognizing this difference helps interpret experimental data correctly.
> 
> Let's check this one before we go further.

Better: [ ] served  [ ] assembled  [ ] same

## 30. `phys.meas.errors`

**Served:**

> Correct—your “No” shows you recognize that a consistently shifted zero gives a precise reading that’s still inaccurate. Next, let’s think about how the spread of the five scattered readings in the figure reflects random error.

**Assembled:**

> That's right.
> 
> Your answer is correct because the worn zero creates a systematic error. The measurements are precise but not accurate. The true length is offset by the 2 mm error.
> 
> A systematic error shifts every measurement by the same amount. To obtain the true length you must determine the offset, for example by measuring a known standard, and then add that correction to each reading. This improves accuracy while preserving the precision of the instrument.
> 
> Here's a question — take your time with it.

Better: [ ] served  [ ] assembled  [ ] same
