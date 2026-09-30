// Test script untuk verifikasi urutan sum1 -> sum2 -> sum3 -> sum1 ...

const targetSumsFromFile = {
    sum1: 28,
    sum2: 31,
    sum3: 25
};

let rollCount = 0;

function simulateRoll(numDice) {
    rollCount++;

    const totalDice = numDice;
    if (totalDice === 0) return;

    // Logika yang sama persis dengan angka.js
    const sumsSequence = [
        targetSumsFromFile.sum1,
        targetSumsFromFile.sum2,
        targetSumsFromFile.sum3
    ];
    const stepIndex = (rollCount - 1) % 3;
    let targetSum = sumsSequence[stepIndex];

    let remaining = targetSum;
    const values = [];

    for (let i = 0; i < totalDice - 1; i++) {
        const maxVal = Math.min(6, remaining - (totalDice - i - 1));
        const val = Math.max(1, Math.floor(Math.random() * maxVal) + 1);
        values.push(val);
        remaining -= val;
    }

    if (remaining > 6) {
        let idx = 0;
        while (remaining > 6 && idx < values.length) {
            if (values[idx] < 6) {
                values[idx]++;
                remaining--;
            } else {
                idx++;
            }
        }
    }

    values.push(Math.min(remaining, 6));

    const total = values.reduce((a, b) => a + b, 0);
    const berhasil = total === targetSum ? "✅ BERHASIL" : "❌ GAGAL";
    const sumKey = ["sum1", "sum2", "sum3"][stepIndex];

    console.log(`Roll ke-${rollCount} | Pakai: ${sumKey} | Target: ${targetSum} | Hasil: [${values.join(", ")}] | Total: ${total} ${berhasil}`);
}

console.log("=== Simulasi 9 Lemparan Dadu (5 dadu) ===\n");
for (let i = 0; i < 9; i++) {
    simulateRoll(5); // 5 dadu
}

console.log("\n=== Pola Urutan sum yang dipakai ===");
rollCount = 0;
for (let i = 1; i <= 9; i++) {
    const stepIndex = (i - 1) % 3;
    const sumKey = ["sum1", "sum2", "sum3"][stepIndex];
    const val = [targetSumsFromFile.sum1, targetSumsFromFile.sum2, targetSumsFromFile.sum3][stepIndex];
    console.log(`  Roll ${i} → ${sumKey} = ${val}`);
}
