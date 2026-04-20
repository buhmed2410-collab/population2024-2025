/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  ComposedChart,
  AreaChart,
  Area,
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserCheck,
  HeartPulse,
  Globe,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  FileText
} from 'lucide-react';

// --- Icons & Decorative Elements ---

const KhanjarIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_var(--brand-primary)] opacity-80">
    <path d="M50 10C50 10 35 30 35 50C35 70 50 90 50 90C50 90 65 70 65 50C65 30 50 10 50 10Z" fill="none" stroke="var(--brand-primary)" strokeWidth="3"/>
    <path d="M40 35H60M42 45H58M45 55H55" stroke="var(--brand-primary)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 10V90" stroke="var(--brand-primary)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
  </svg>
);

const LubanTreeIcon = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_8px_var(--brand-primary)] opacity-80">
    <path d="M50 90V60M50 60L30 40M50 60L70 40M50 50L50 30" stroke="var(--brand-primary)" strokeWidth="4" strokeLinecap="round"/>
    <circle cx="30" cy="40" r="8" fill="var(--brand-accent)" />
    <circle cx="70" cy="40" r="8" fill="var(--brand-accent)" />
    <circle cx="50" cy="30" r="10" fill="var(--brand-accent)" />
    <circle cx="50" cy="15" r="6" fill="var(--brand-accent)" />
  </svg>
);

const AGE_GROUPS_2024 = [
  { range: '0 - 4', male: 20087, female: 19333, total: 39420 },
  { range: '5 - 9', male: 21730, female: 21095, total: 42825 },
  { range: '10 - 14', male: 18568, female: 17574, total: 36142 },
  { range: '15 - 19', male: 13883, female: 12993, total: 26876 },
  { range: '20 - 24', male: 26748, female: 13040, total: 39788 },
  { range: '25 - 29', male: 40596, female: 15344, total: 55940 },
  { range: '30 - 34', male: 46884, female: 17000, total: 63884 },
  { range: '35 - 39', male: 53231, female: 18096, total: 71327 },
  { range: '40 - 44', male: 41362, female: 15114, total: 56476 },
  { range: '45 - 49', male: 25820, female: 10824, total: 36644 },
  { range: '50 - 54', male: 15632, female: 6053, total: 21685 },
  { range: '55 - 59', male: 9796, female: 4462, total: 14258 },
  { range: '60 - 64', male: 5990, female: 3735, total: 9725 },
  { range: '65 - 69', male: 3981, female: 3000, total: 6981 },
  { range: '70 - 74', male: 1603, female: 1669, total: 3272 },
  { range: '75 - 79', male: 959, female: 1110, total: 2069 },
  { range: '80+', male: 973, female: 1340, total: 2313 },
];

const AGE_GROUPS_2025 = [
  { range: '0 - 4', male: 20045, female: 19443, total: 39488 },
  { range: '5 - 9', male: 22104, female: 21296, total: 43400 },
  { range: '10 - 14', male: 19598, female: 18525, total: 38123 },
  { range: '15 - 19', male: 14989, female: 13987, total: 28976 },
  { range: '20 - 24', male: 20946, female: 13928, total: 34874 },
  { range: '25 - 29', male: 40156, female: 16169, total: 56325 },
  { range: '30 - 34', male: 43038, female: 17260, total: 60298 },
  { range: '35 - 39', male: 50465, female: 18603, total: 69068 },
  { range: '40 - 44', male: 42814, female: 16112, total: 58926 },
  { range: '45 - 49', male: 27718, female: 11872, total: 39590 },
  { range: '50 - 54', male: 16344, female: 6735, total: 23079 },
  { range: '55 - 59', male: 10430, female: 4618, total: 15048 },
  { range: '60 - 64', male: 6038, female: 3747, total: 9785 },
  { range: '65 - 69', male: 4206, female: 3216, total: 7422 },
  { range: '70 - 74', male: 1855, female: 1764, total: 3619 },
  { range: '75 - 79', male: 979, female: 1167, total: 2146 },
  { range: '80+', male: 1001, female: 1351, total: 2352 },
];
const AGE_DISTRIBUTION_OMANI: Record<string, Record<string, number[][]>> = {
  '2024': {
    'صلالة': [[10241, 9842], [11466, 11218], [9552, 9302], [6953, 6662], [5891, 5651], [5713, 5660], [6343, 6185], [6608, 6411], [6039, 6085], [4838, 4698], [2930, 2572], [2047, 1971], [1892, 1817], [1448, 1618], [745, 873], [449, 553], [480, 691]],
    'طاقة': [[1400, 1281], [1371, 1322], [1116, 1031], [799, 757], [700, 703], [777, 723], [860, 915], [906, 868], [796, 768], [468, 537], [294, 236], [228, 225], [206, 265], [207, 239], [81, 133], [78, 82], [79, 171]],
    'مرباط': [[873, 883], [883, 847], [763, 690], [506, 504], [545, 460], [635, 549], [677, 631], [685, 663], [573, 552], [380, 368], [197, 169], [174, 186], [142, 231], [169, 169], [64, 116], [62, 87], [84, 106]],
    'رخيوت': [[325, 317], [306, 304], [245, 204], [175, 174], [171, 190], [186, 208], [198, 195], [219, 172], [145, 140], [82, 69], [59, 48], [70, 82], [51, 61], [42, 50], [29, 28], [23, 33], [30, 43]],
    'ثمريت': [[827, 827], [872, 865], [715, 681], [545, 465], [437, 403], [375, 359], [383, 370], [370, 352], [285, 302], [207, 201], [108, 114], [76, 88], [89, 94], [83, 69], [38, 45], [23, 44], [48, 73]],
    'ضلكوت': [[207, 217], [219, 211], [166, 185], [104, 104], [108, 111], [123, 112], [120, 133], [118, 126], [101, 84], [54, 43], [40, 26], [35, 60], [39, 47], [42, 29], [22, 16], [14, 22], [13, 28]],
    'المزيونة': [[743, 685], [694, 722], [598, 563], [492, 450], [406, 340], [340, 350], [337, 353], [256, 271], [172, 158], [84, 88], [79, 66], [84, 109], [90, 75], [111, 60], [32, 26], [28, 38], [30, 43]],
    'مقشن': [[32, 47], [34, 56], [36, 36], [29, 28], [35, 28], [25, 22], [19, 26], [17, 23], [23, 30], [12, 19], [13, 3], [4, 11], [10, 10], [5, 8], [4, 3], [1, 1], [2, 3]],
    'شليم وجزر الحلانيات': [[292, 287], [359, 325], [293, 254], [191, 175], [187, 158], [174, 186], [166, 170], [174, 187], [116, 135], [77, 60], [58, 34], [43, 48], [26, 36], [55, 34], [19, 25], [12, 15], [27, 20]],
    'سدح': [[334, 301], [351, 307], [291, 266], [230, 219], [210, 211], [224, 195], [264, 252], [277, 251], [202, 211], [128, 111], [56, 63], [46, 53], [70, 83], [54, 63], [31, 42], [23, 29], [33, 41]]
  },
  '2025': {
    'صلالة': [[9880, 9589], [11459, 11119], [10158, 9775], [7442, 7147], [5973, 5764], [5793, 5658], [6198, 6050], [6588, 6464], [6204, 6230], [5206, 5107], [3256, 2914], [2162, 1979], [1868, 1796], [1566, 1782], [834, 950], [485, 580], [484, 710]],
    'طاقة': [[1329, 1246], [1411, 1341], [1204, 1102], [846, 824], [736, 687], [750, 722], [832, 848], [914, 912], [832, 799], [541, 611], [304, 259], [231, 227], [209, 262], [219, 252], [98, 140], [77, 87], [75, 154]],
    'مرباط': [[889, 849], [858, 844], [779, 716], [545, 508], [504, 485], [583, 508], [656, 619], [700, 627], [594, 575], [424, 395], [210, 195], [161, 167], [144, 212], [169, 185], [70, 112], [59, 98], [77, 98]],
    'رخيوت': [[332, 318], [319, 298], [248, 234], [172, 166], [164, 176], [196, 206], [193, 202], [214, 183], [164, 148], [95, 81], [49, 45], [70, 78], [51, 60], [47, 51], [27, 33], [20, 32], [32, 40]],
    'ثمريت': [[825, 820], [893, 874], [743, 748], [588, 508], [433, 409], [405, 358], [388, 378], [352, 356], [332, 323], [221, 222], [115, 128], [85, 86], [79, 97], [98, 79], [45, 34], [25, 50], [43, 79]],
    'ضلكوت': [[198, 210], [208, 210], [162, 187], [106, 115], [99, 109], [134, 110], [122, 115], [107, 134], [109, 89], [58, 42], [39, 28], [35, 46], [41, 47], [39, 37], [20, 12], [16, 20], [13, 26]],
    'المزيونة': [[756, 726], [756, 712], [618, 626], [534, 477], [410, 373], [390, 361], [328, 377], [296, 309], [212, 193], [108, 126], [82, 86], [77, 89], [101, 104], [112, 67], [51, 42], [28, 36], [42, 53]],
    'مقشن': [[35, 43], [35, 53], [29, 36], [33, 28], [34, 26], [28, 23], [16, 22], [15, 24], [23, 28], [11, 17], [12, 10], [4, 9], [7, 7], [9, 9], [3, 3], [2, 1], [1, 1]],
    'شليم وجزر الحلانيات': [[295, 304], [344, 320], [309, 279], [212, 183], [194, 167], [177, 173], [172, 182], [170, 175], [138, 154], [85, 76], [57, 35], [48, 49], [24, 39], [55, 40], [22, 23], [9, 20], [29, 20]],
    'سدح': [[323, 298], [349, 319], [310, 278], [254, 238], [196, 206], [219, 201], [262, 233], [277, 262], [228, 218], [146, 134], [65, 68], [46, 57], [53, 56], [60, 74], [40, 49], [24, 23], [30, 39]]
  }
};

const AGE_DISTRIBUTION_EXPAT: Record<string, Record<string, number[][]>> = {
  '2024': {
    'صلالة': [[4561, 4427], [4888, 4644], [4442, 4050], [3605, 3188], [16514, 4394], [29022, 6334], [34053, 7033], [39438, 7874], [29769, 5988], [17641, 4186], [10727, 2509], [6387, 1516], [3080, 955], [1628, 617], [500, 336], [222, 193], [129, 110]],
    'طاقة': [[47, 28], [46, 51], [50, 50], [53, 46], [365, 76], [625, 109], [608, 153], [693, 185], [463, 137], [260, 88], [156, 47], [77, 28], [44, 10], [22, 8], [5, 6], [5, 1], [1, 2]],
    'مرباط': [[46, 42], [40, 45], [52, 40], [39, 28], [256, 76], [569, 107], [601, 124], [739, 145], [541, 132], [308, 68], [156, 29], [87, 21], [38, 7], [17, 10], [5, 2], [1, 2], [0, 0]],
    'رخيوت': [[6, 3], [12, 9], [9, 8], [2, 6], [30, 8], [68, 17], [71, 20], [94, 29], [68, 21], [27, 11], [11, 9], [12, 3], [3, 0], [0, 0], [2, 4], [1, 0], [1, 0]],
    'ثمريت': [[76, 60], [93, 68], [111, 94], [63, 94], [440, 103], [838, 229], [1154, 220], [1389, 279], [1114, 202], [711, 143], [414, 71], [224, 30], [133, 28], [67, 13], [19, 6], [11, 3], [10, 3]],
    'ضلكوت': [[6, 6], [10, 7], [17, 11], [11, 17], [13, 5], [20, 10], [32, 19], [35, 32], [31, 15], [26, 8], [15, 7], [9, 2], [6, 2], [2, 0], [0, 0], [1, 1], [1, 0]],
    'المزيونة': [[30, 33], [43, 36], [50, 48], [47, 46], [137, 70], [262, 96], [219, 96], [228, 85], [177, 68], [99, 56], [61, 30], [35, 17], [22, 7], [14, 8], [4, 6], [3, 3], [3, 3]],
    'مقشن': [[0, 1], [6, 5], [11, 4], [5, 4], [4, 2], [13, 4], [24, 6], [26, 10], [23, 6], [23, 8], [13, 3], [9, 1], [2, 0], [4, 2], [0, 0], [0, 1], [0, 1]],
    'شليم وجزر الحلانيات': [[33, 37], [28, 43], [35, 37], [26, 18], [267, 32], [532, 47], [665, 75], [845, 93], [646, 50], [355, 38], [212, 11], [121, 9], [38, 6], [9, 2], [3, 2], [2, 2], [1, 2]],
    'سدح': [[8, 9], [9, 10], [16, 20], [8, 8], [32, 19], [75, 27], [90, 24], [114, 40], [78, 30], [40, 24], [33, 6], [28, 2], [9, 1], [2, 1], [0, 0], [0, 0], [1, 0]]
  },
  '2025': {
    'صلالة': [[4903, 4775], [5142, 4881], [4681, 4229], [3936, 3483], [11067, 5046], [28308, 7122], [30414, 7477], [36601, 8246], [30380, 6627], [18644, 4590], [10888, 2715], [6814, 1688], [3129, 1001], [1683, 596], [604, 340], [212, 203], [156, 119]],
    'طاقة': [[53, 32], [51, 52], [56, 56], [66, 53], [253, 110], [662, 118], [595, 151], [733, 182], [523, 155], [294, 91], [180, 52], [92, 37], [51, 12], [22, 8], [6, 3], [2, 3], [2, 1]],
    'مرباط': [[49, 50], [40, 55], [57, 41], [51, 39], [173, 86], [539, 118], [596, 126], [708, 148], [589, 125], [345, 82], [175, 34], [110, 22], [47, 11], [18, 7], [4, 3], [2, 2], [0, 0]],
    'رخيوت': [[2, 4], [14, 10], [17, 9], [11, 6], [25, 8], [67, 21], [79, 20], [100, 26], [90, 20], [40, 16], [19, 9], [17, 6], [3, 1], [4, 0], [1, 3], [0, 1], [1, 0]],
    'ثمريت': [[84, 78], [109, 91], [95, 91], [75, 95], [301, 128], [905, 238], [1071, 244], [1298, 277], [1208, 226], [780, 149], [471, 88], [254, 37], [130, 24], [72, 18], [19, 8], [13, 3], [12, 5]],
    'ضلكوت': [[5, 5], [10, 7], [16, 9], [15, 20], [21, 2], [33, 8], [41, 18], [49, 28], [45, 20], [31, 14], [30, 7], [13, 4], [9, 3], [3, 0], [0, 1], [1, 1], [0, 0]],
    'المزيونة': [[30, 35], [40, 43], [57, 55], [56, 49], [96, 81], [258, 120], [208, 98], [230, 104], [207, 76], [115, 54], [64, 27], [37, 20], [25, 7], [12, 7], [6, 5], [3, 6], [3, 3]],
    'مقشن': [[0, 1], [8, 6], [9, 2], [4, 8], [4, 2], [8, 6], [17, 6], [26, 11], [22, 5], [26, 5], [13, 4], [15, 2], [3, 0], [3, 0], [0, 0], [0, 0], [0, 1]],
    'شليم وجزر الحلانيات': [[44, 47], [48, 45], [36, 36], [32, 28], [246, 46], [629, 65], [755, 73], [975, 96], [829, 62], [497, 38], [276, 20], [137, 10], [49, 7], [13, 2], [5, 3], [1, 1], [0, 2]],
    'سدح': [[13, 13], [10, 16], [14, 16], [11, 12], [17, 17], [72, 33], [95, 21], [112, 39], [85, 39], [51, 22], [39, 11], [22, 5], [15, 1], [2, 2], [0, 0], [0, 0], [1, 0]]
  }
};

const REAL_WILAYAT_AGE_DATA: Record<string, Record<string, number[][]>> = {
  '2024': {
    'صلالة': [[14802, 14269], [16354, 15862], [13994, 13352], [10558, 9850], [22405, 10045], [34735, 11994], [40396, 13218], [46046, 14285], [35808, 12073], [22479, 8884], [13657, 5081], [8434, 3487], [4972, 2772], [3076, 2235], [1245, 1209], [671, 746], [609, 801]],
    'طاقة': [[1447, 1309], [1417, 1373], [1166, 1081], [852, 803], [1065, 779], [1402, 832], [1468, 1068], [1599, 1053], [1259, 905], [728, 625], [450, 283], [305, 253], [250, 275], [229, 247], [86, 139], [83, 83], [80, 173]],
    'مرباط': [[919, 925], [923, 892], [815, 730], [545, 532], [801, 536], [1204, 656], [1278, 755], [1424, 808], [1114, 684], [688, 436], [353, 198], [261, 207], [180, 238], [186, 179], [69, 118], [63, 89], [84, 106]],
    'رخيوت': [[331, 320], [318, 313], [254, 212], [177, 180], [201, 198], [254, 225], [269, 215], [313, 201], [213, 161], [109, 80], [70, 57], [82, 85], [54, 61], [42, 50], [31, 32], [24, 33], [31, 43]],
    'ثمريت': [[903, 887], [965, 933], [826, 775], [608, 559], [877, 506], [1213, 588], [1537, 590], [1759, 631], [1399, 504], [918, 344], [522, 185], [300, 118], [222, 122], [150, 82], [57, 51], [34, 47], [58, 76]],
    'ضلكوت': [[213, 223], [229, 218], [183, 196], [115, 121], [121, 116], [143, 122], [152, 152], [153, 158], [132, 99], [80, 51], [55, 33], [44, 62], [45, 49], [44, 29], [22, 16], [15, 23], [14, 28]],
    'المزيونة': [[773, 718], [737, 758], [648, 611], [539, 496], [543, 410], [602, 446], [556, 449], [484, 356], [349, 226], [183, 144], [140, 96], [119, 126], [112, 82], [125, 68], [36, 32], [31, 41], [33, 46]],
    'مقشن': [[32, 48], [40, 61], [47, 40], [34, 32], [39, 30], [38, 26], [43, 32], [43, 33], [46, 36], [35, 27], [26, 6], [13, 12], [12, 10], [9, 10], [4, 3], [1, 2], [2, 4]],
    'شليم وجزر الحلانيات': [[325, 324], [387, 368], [328, 291], [217, 193], [454, 190], [706, 233], [831, 245], [1019, 280], [762, 185], [432, 98], [270, 45], [164, 57], [64, 42], [64, 36], [22, 27], [14, 17], [28, 22]],
    'سدح': [[342, 310], [360, 317], [307, 286], [238, 227], [242, 230], [299, 222], [354, 276], [391, 291], [280, 241], [168, 135], [89, 69], [74, 55], [79, 84], [56, 64], [31, 42], [23, 29], [34, 41]]
  },
  '2025': {
    'صلالة': [[14783, 14364], [16601, 16000], [14839, 14004], [11378, 10630], [17040, 10810], [34101, 12780], [36612, 13527], [43189, 14710], [36584, 12857], [23850, 9697], [14144, 5629], [8976, 3667], [4997, 2797], [3249, 2378], [1438, 1290], [697, 783], [640, 829]],
    'طاقة': [[1382, 1278], [1462, 1393], [1260, 1158], [912, 877], [989, 797], [1412, 840], [1427, 999], [1647, 1094], [1355, 954], [835, 702], [484, 311], [323, 264], [260, 274], [241, 260], [104, 143], [79, 90], [77, 155]],
    'مرباط': [[938, 899], [898, 899], [836, 757], [596, 547], [677, 571], [1122, 626], [1252, 745], [1408, 775], [1183, 700], [769, 477], [385, 229], [271, 189], [191, 223], [187, 192], [74, 115], [61, 100], [77, 98]],
    'رخيوت': [[334, 322], [333, 308], [265, 243], [183, 172], [189, 184], [263, 227], [272, 222], [314, 209], [254, 168], [135, 97], [68, 54], [87, 84], [54, 61], [51, 51], [28, 36], [20, 33], [33, 40]],
    'ثمريت': [[909, 898], [1002, 965], [838, 839], [663, 603], [734, 537], [1310, 596], [1459, 622], [1650, 633], [1540, 549], [1001, 371], [586, 216], [339, 123], [209, 121], [170, 97], [64, 42], [38, 53], [55, 84]],
    'ضلكوت': [[203, 215], [218, 217], [178, 196], [121, 135], [120, 111], [167, 118], [163, 133], [156, 162], [154, 109], [89, 56], [69, 35], [48, 50], [50, 50], [42, 37], [20, 13], [17, 21], [13, 26]],
    'المزيونة': [[786, 761], [796, 755], [675, 681], [590, 526], [506, 454], [648, 481], [536, 475], [526, 413], [419, 269], [223, 180], [146, 113], [114, 109], [126, 111], [124, 74], [57, 47], [31, 42], [45, 56]],
    'مقشن': [[35, 44], [43, 59], [38, 38], [37, 36], [38, 28], [36, 29], [33, 28], [41, 35], [45, 33], [37, 22], [25, 14], [19, 11], [10, 7], [12, 9], [3, 3], [2, 1], [1, 2]],
    'شليم وجزر الحلانيات': [[339, 351], [392, 365], [345, 315], [244, 211], [440, 213], [806, 238], [927, 255], [1145, 271], [967, 216], [582, 114], [333, 55], [185, 59], [73, 46], [68, 42], [27, 26], [10, 21], [29, 22]],
    'سدح': [[336, 311], [359, 335], [324, 294], [265, 250], [213, 223], [291, 234], [357, 254], [389, 301], [313, 257], [197, 156], [104, 79], [68, 62], [68, 57], [62, 76], [40, 49], [24, 23], [31, 39]]
  }
};

const NationalEmblemLogo = () => (
  <div className="flex flex-col items-center justify-center text-[10px] font-bold text-cyan-400 leading-tight text-center drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
    <div className="w-12 h-12 flex items-center justify-center mb-1">
       <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Crossed Swords */}
          <path d="M20 80 L80 20 M80 80 L20 20" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round"/>
          {/* Khanjar */}
          <path d="M50 15 C50 15 35 30 35 45 C35 60 50 85 50 85 C50 85 65 60 65 45 C65 30 50 15 50 15Z" fill="none" stroke="#22d3ee" strokeWidth="3"/>
          <path d="M40 35 H60 M42 42 H58 M45 50 H55" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
       </svg>
    </div>
    <span className="text-[9px] opacity-90">المديرية العامة للخدمات الصحية</span>
    <span className="text-[9px] opacity-90">بمحافظة ظفار</span>
  </div>
);

// --- Data ---

const DATA_2024 = {
  total: 529625,
  omani: 238843,
  expat: 290782,
  wilayats: [
    { name: 'صلالة', total: 430404, omani: 165444, expat: 264960, male: 290241, female: 140163 },
    { name: 'طاقة', total: 25167, omani: 20622, expat: 4545, male: 13886, female: 11281 },
    { name: 'مرباط', total: 18996, omani: 14623, expat: 4373, male: 10907, female: 8089 },
    { name: 'رخيوت', total: 5239, omani: 4674, expat: 565, male: 2773, female: 2466 },
    { name: 'ثمريت', total: 19346, omani: 10833, expat: 8513, male: 12348, female: 6998 },
    { name: 'ضلكوت', total: 3456, omani: 3079, expat: 377, male: 1760, female: 1696 },
    { name: 'المزيونة', total: 11115, omani: 8973, expat: 2142, male: 6010, female: 5105 },
    { name: 'مقشن', total: 876, omani: 655, expat: 221, male: 464, female: 412 },
    { name: 'شليم وجزر الحلانيات', total: 8740, omani: 4418, expat: 4322, male: 6087, female: 2653 },
    { name: 'سدح', total: 6286, omani: 5522, expat: 764, male: 3367, female: 2919 },
  ]
};

const DATA_2025 = {
  total: 532519,
  omani: 244381,
  expat: 288138,
  wilayats: [
    { name: 'صلالة', total: 429870, omani: 169170, expat: 260700, male: 283118, female: 146752 },
    { name: 'طاقة', total: 25838, omani: 21081, expat: 4757, male: 14249, female: 11589 },
    { name: 'مرباط', total: 19067, omani: 14615, expat: 4452, male: 10925, female: 8142 },
    { name: 'رخيوت', total: 5394, omani: 4744, expat: 650, male: 2883, female: 2511 },
    { name: 'ثمريت', total: 19916, omani: 11219, expat: 8697, male: 12567, female: 7349 },
    { name: 'ضلكوت', total: 3512, omani: 3043, expat: 469, male: 1828, female: 1684 },
    { name: 'المزيونة', total: 11895, omani: 9658, expat: 2237, male: 6348, female: 5547 },
    { name: 'مقشن', total: 854, omani: 637, expat: 217, male: 455, female: 399 },
    { name: 'شليم وجزر الحلانيات', total: 9732, omani: 4579, expat: 5153, male: 6912, female: 2820 },
    { name: 'سدح', total: 6441, omani: 5635, expat: 806, male: 3441, female: 3000 },
  ]
};

// --- Components ---

const StatCard = ({ title, value, subValue, icon: Icon, trend, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/90 backdrop-blur-sm border-b-4 p-6 rounded-2xl shadow-xl flex flex-col justify-between"
    style={{ borderColor: color }}
  >
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700">
        <Icon size={24} />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center text-sm font-bold ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
          {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="mt-4">
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 tabular-nums">{value?.toLocaleString() ?? '0'}</p>
      {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
    </div>
  </motion.div>
);

export default function App() {
  const [theme, setTheme] = useState('original');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedWilayatAge, setSelectedWilayatAge] = useState('all');
  const [selectedNatAge, setSelectedNatAge] = useState('total');
  const [selectedGenderAge, setSelectedGenderAge] = useState('total');

  const calculateDynamicTotal = useMemo(() => (year: string, wilayatName: string, nationality: string, gender: string) => {
    if (nationality === 'total' && gender === 'total') {
        const yearData = year === '2024' ? DATA_2024 : DATA_2025;
        const wData = yearData.wilayats.find(w => w.name === wilayatName);
        return wData ? wData.total : 0;
    }

    const natMap = nationality === 'omani' ? AGE_DISTRIBUTION_OMANI : 
                   (nationality === 'expat' ? AGE_DISTRIBUTION_EXPAT : REAL_WILAYAT_AGE_DATA);
    
    const rows = natMap[year]?.[wilayatName];
    if (!rows) return 0;

    let sum = 0;
    rows.forEach(([m, f]) => {
        if (gender === 'male') sum += m;
        else if (gender === 'female') sum += f;
        else sum += (m + f);
    });
    return sum;
  }, []);

  const comparisonData = useMemo(() => [
    { name: 'إجمالي السكان', '2024': DATA_2024.total, '2025': DATA_2025.total },
    { name: 'العمانيون', '2024': DATA_2024.omani, '2025': DATA_2025.omani },
    { name: 'الوافدون', '2024': DATA_2024.expat, '2025': DATA_2025.expat },
    { name: 'الذكور', '2024': 347843, '2025': 342726 },
    { name: 'الإناث', '2024': 181782, '2025': 189793 },
  ], []);

  const wilayatComparison = useMemo(() => {
    const list = DATA_2025.wilayats.map((w, idx) => {
      const name = w.name;
      
      return {
        name,
        '2024': calculateDynamicTotal('2024', name, selectedNatAge, selectedGenderAge),
        '2025': calculateDynamicTotal('2025', name, selectedNatAge, selectedGenderAge),
        growth: 0, // Calculated below
        
        // Composition Data (affected by Gender and Nationality filters)
        omani_2024: (selectedNatAge === 'total' || selectedNatAge === 'omani') ? calculateDynamicTotal('2024', name, 'omani', selectedGenderAge) : 0,
        omani_2025: (selectedNatAge === 'total' || selectedNatAge === 'omani') ? calculateDynamicTotal('2025', name, 'omani', selectedGenderAge) : 0,
        expat_2024: (selectedNatAge === 'total' || selectedNatAge === 'expat') ? calculateDynamicTotal('2024', name, 'expat', selectedGenderAge) : 0,
        expat_2025: (selectedNatAge === 'total' || selectedNatAge === 'expat') ? calculateDynamicTotal('2025', name, 'expat', selectedGenderAge) : 0,
        
        // Gender Data (affected by Nationality and Gender filters)
        male_2024: (selectedGenderAge === 'total' || selectedGenderAge === 'male') ? calculateDynamicTotal('2024', name, selectedNatAge, 'male') : 0,
        male_2025: (selectedGenderAge === 'total' || selectedGenderAge === 'male') ? calculateDynamicTotal('2025', name, selectedNatAge, 'male') : 0,
        female_2024: (selectedGenderAge === 'total' || selectedGenderAge === 'female') ? calculateDynamicTotal('2024', name, selectedNatAge, 'female') : 0,
        female_2025: (selectedGenderAge === 'total' || selectedGenderAge === 'female') ? calculateDynamicTotal('2025', name, selectedNatAge, 'female') : 0,
      };
    });

    return list.map(item => ({
        ...item,
        growth: item['2024'] > 0 ? ((item['2025'] - item['2024']) / item['2024'] * 100).toFixed(1) : '0.0'
    })).filter(w => selectedWilayatAge === 'all' || w.name === selectedWilayatAge);
  }, [selectedNatAge, selectedGenderAge, selectedWilayatAge, calculateDynamicTotal]);

  const ageGroupData = useMemo(() => {
    const baseGroups = selectedYear === '2024' ? AGE_GROUPS_2024 : AGE_GROUPS_2025;
    
    // Function to get real age data from the new mapping
    const getWilayatData = (yearStr: string, wilayatName: string, nationality: string, gender: string) => {
      if (yearStr === 'compare') return null; // Handled separately
      
      const yearMap = REAL_WILAYAT_AGE_DATA[yearStr];
      const omaniYearMap = AGE_DISTRIBUTION_OMANI[yearStr];
      const expatYearMap = AGE_DISTRIBUTION_EXPAT[yearStr];

      let targetMap = yearMap;
      if (nationality === 'omani') targetMap = omaniYearMap;
      if (nationality === 'expat') targetMap = expatYearMap;

      let result: any[] = [];

      if (wilayatName === 'all' || !targetMap || !targetMap[wilayatName]) {
          // Calculate sums across all wilayats for the chosen nationality
          result = baseGroups.map((group, idx) => {
            let mSum = 0;
            let fSum = 0;
            Object.keys(targetMap).forEach(wKey => {
                const rows = targetMap[wKey];
                const [m, f] = rows[idx] || [0, 0];
                mSum += m;
                fSum += f;
            });
            return {
                range: group.range,
                male: mSum,
                female: fSum,
                total: mSum + fSum
            };
          });
      } else {
        const wilayatRows = targetMap[wilayatName];
        result = baseGroups.map((group, idx) => {
          const [male, female] = wilayatRows[idx] || [0, 0];
          return {
            range: group.range,
            male,
            female,
            total: male + female,
          };
        });
      }

      // Apply Gender Filter
      if (gender === 'male') {
        return result.map(d => ({ ...d, female: 0, total: d.male }));
      } else if (gender === 'female') {
        return result.map(d => ({ ...d, male: 0, total: d.female }));
      }
      return result;
    };

    if (selectedYear === 'compare') {
      const data2024 = getWilayatData('2024', selectedWilayatAge, selectedNatAge, selectedGenderAge);
      const data2025 = getWilayatData('2025', selectedWilayatAge, selectedNatAge, selectedGenderAge);
      
      if (!data2024 || !data2025) return [];

      return data2025.map((item, idx) => ({
        range: item.range,
        total_2024: data2024[idx].total,
        total_2025: item.total
      }));
    }

    return getWilayatData(selectedYear, selectedWilayatAge, selectedNatAge, selectedGenderAge) || [];
  }, [selectedYear, selectedWilayatAge, selectedNatAge, selectedGenderAge]);

  const projectionData = [
    { year: '2024', total: DATA_2024.total },
    { year: '2025', total: DATA_2025.total },
    { year: '2026', total: Math.floor(DATA_2025.total * 1.006) }, // Predicted
  ];

  const pieData2025 = useMemo(() => {
    const data = selectedYear === '2024' ? DATA_2024 : DATA_2025;
    return [
      { name: 'عمانيون', value: data.omani },
      { name: 'وافدون', value: data.expat },
    ];
  }, [selectedYear]);

  const COLORS = ['#00e5ff', '#ffea00', '#003b4d', '#4fc3f7'];

  return (
    <div className="theme-container theme-transition relative p-4 md:p-10 font-sans" dir="rtl" data-theme={theme}>
      {/* Decorative Background Pattern */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='var(--brand-primary)' fill-rule='evenodd'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[var(--border-ui)] pb-8 mb-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-black text-[var(--brand-primary)] text-sm leading-tight">المديرية العامة للخدمات الصحية</div>
              <div className="font-black text-[var(--brand-primary)] text-sm leading-tight mb-1">بمحافظة ظفار</div>
              <div className="text-[10px] text-[var(--text-muted)] font-bold mb-0.5">دائرة التخطيط والتنظيم الصحي</div>
              <div className="text-[11px] text-[var(--brand-secondary)] font-black">إدارة المعلومات الصحية</div>
            </div>
          </div>
          
          <div className="flex gap-2 p-1 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-ui)]">
            {['original', 'royal', 'health', 'night'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  theme === t 
                    ? 'bg-[var(--brand-primary)] text-white shadow-md' 
                    : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)]'
                }`}
              >
                {t === 'original' ? 'الأساسي' : t === 'royal' ? 'تراثي' : t === 'health' ? 'عصري' : 'ليلي'}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-center flex-grow">
          <h1 className={`${theme === 'royal' ? 'font-serif' : 'font-sans'} text-3xl md:text-5xl lg:text-6xl font-black text-[var(--brand-primary)] tracking-tight m-0 drop-shadow-sm transition-all duration-500 whitespace-nowrap`}>التعداد السكاني لظفار 2024-2025</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-left">
            <div className="font-bold text-[var(--brand-primary)] text-[11px] leading-tight opacity-80">Directorate General of Health Services</div>
            <div className="font-bold text-[var(--brand-primary)] text-[11px] leading-tight mb-1 opacity-80">Dhofar Governorate</div>
            <div className="text-[9px] text-[var(--text-muted)] font-semibold mb-0.5">Health Planning & Organization</div>
            <div className="text-[10px] text-[var(--brand-secondary)] font-black">Health Information Management</div>
          </div>
          <LubanTreeIcon />
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <nav className="relative z-10 flex flex-wrap justify-center mb-10 bg-[var(--bg-surface)] p-2 rounded-2xl border border-[var(--border-ui)] gap-1 shadow-sm max-w-4xl mx-auto">
          {[
            { id: 'overview', label: 'التقرير الشامل', icon: <PieChartIcon size={18} /> },
            { id: 'analysis', label: 'التحليل المقارن', icon: <TrendingUp size={18} /> },
            { id: 'wilayats', label: 'توزيع الولايات', icon: <MapPin size={18} /> },
            { id: 'age', label: 'الفئات العمرية', icon: <BarChartIcon size={18} /> },
            { id: 'gender', label: 'توزيع النوع', icon: <Users size={18} /> },
            { id: 'composition', label: 'تركيبة السكان', icon: <Globe size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-[var(--brand-primary)] text-white shadow-lg scale-105' 
                  : 'text-[var(--text-muted)] hover:bg-[var(--bg-card)]'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Global Filter Bar - Centralized for all tabs */}
        <div className="relative z-20 sticky top-4 mb-4 flex flex-wrap justify-center gap-3 bg-[var(--bg-card)]/80 backdrop-blur-md p-3 rounded-2xl border border-[var(--border-ui)] shadow-lg max-w-fit mx-auto">
          <div className="flex items-center gap-2 border-l border-[var(--border-ui)] pl-3 ml-1">
            <MapPin size={16} className="text-[var(--brand-primary)]" />
            <select 
              value={selectedWilayatAge}
              onChange={(e) => setSelectedWilayatAge(e.target.value)}
              className="bg-transparent text-[var(--brand-primary)] text-sm font-black outline-none cursor-pointer rtl:pr-1"
            >
              <option value="all">كل الولايات (المحافظة)</option>
              {DATA_2025.wilayats.map(w => (
                <option key={w.name} value={w.name}>{w.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 border-l border-[var(--border-ui)] pl-3 ml-1">
            <Calendar size={16} className="text-[var(--brand-primary)]" />
            <div className="flex rounded-lg overflow-hidden border border-[var(--border-ui)]">
              {['2024', '2025', 'compare'].map(y => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1 text-xs font-black transition-all ${
                    selectedYear === y 
                      ? 'bg-[var(--brand-primary)] text-white' 
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {y === 'compare' ? 'مقارنة' : y}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-[var(--border-ui)] pl-3 ml-1">
            <Users size={16} className="text-[var(--brand-primary)]" />
            <div className="flex rounded-lg overflow-hidden border border-[var(--border-ui)]">
              {['total', 'omani', 'expat'].map(n => (
                <button
                  key={n}
                  onClick={() => setSelectedNatAge(n)}
                  className={`px-3 py-1 text-xs font-black transition-all ${
                    selectedNatAge === n 
                      ? 'bg-[var(--brand-primary)] text-white' 
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {n === 'total' ? 'إجمالي' : n === 'omani' ? 'عمانيون' : 'وافدون'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Activity size={16} className="text-[var(--brand-primary)]" />
            <div className="flex rounded-lg overflow-hidden border border-[var(--border-ui)]">
              {['total', 'male', 'female'].map(g => (
                <button
                  key={g}
                  onClick={() => setSelectedGenderAge(g)}
                  className={`px-3 py-1 text-xs font-black transition-all ${
                    selectedGenderAge === g 
                      ? 'bg-[var(--brand-primary)] text-white' 
                      : 'text-[var(--text-muted)] hover:bg-[var(--bg-surface)]'
                  }`}
                >
                  {g === 'total' ? 'الكل' : g === 'male' ? 'ذكور' : 'إناث'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'analysis' && (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {(() => {
                  const currentWilayat = wilayatComparison[0];
                  if (!currentWilayat) return null;
                  
                  const totalGrowth = parseFloat(currentWilayat.growth);
                  const omaniGrowth = currentWilayat.omani_2024 > 0 
                    ? ((currentWilayat.omani_2025 - currentWilayat.omani_2024) / currentWilayat.omani_2024 * 100).toFixed(1) 
                    : '0.0';
                  const expatGrowth = currentWilayat.expat_2024 > 0 
                    ? ((currentWilayat.expat_2025 - currentWilayat.expat_2024) / currentWilayat.expat_2024 * 100).toFixed(1) 
                    : '0.0';
                  
                  return (
                    <>
                      <StatCard 
                        title="نمو إجمالي السكان" 
                        value={`${totalGrowth > 0 ? '+' : ''}${totalGrowth}%`} 
                        subValue={selectedWilayatAge === 'all' ? 'على مستوى المحافظة' : `في ولاية ${selectedWilayatAge}`} 
                        icon={TrendingUp} 
                        trend={totalGrowth}
                        color="var(--brand-primary)" 
                      />
                      <StatCard 
                        title="نمو السكان العمانيين" 
                        value={`${parseFloat(omaniGrowth) > 0 ? '+' : ''}${omaniGrowth}%`} 
                        subValue="مواطنون" 
                        icon={UserCheck} 
                        trend={parseFloat(omaniGrowth)}
                        color="#3b82f6" 
                      />
                      <StatCard 
                        title="تغير سكان الوافدين" 
                        value={`${parseFloat(expatGrowth) > 0 ? '+' : ''}${expatGrowth}%`} 
                        subValue="مقيمون" 
                        icon={Globe} 
                        trend={parseFloat(expatGrowth)}
                        color="#ef4444" 
                      />
                      <StatCard 
                        title="إجمالي الزيادة العددية" 
                        value={(currentWilayat['2025'] - currentWilayat['2024']).toLocaleString()} 
                        subValue="نسمة إضافية" 
                        icon={Users} 
                        trend={currentWilayat['2025'] - currentWilayat['2024']}
                        color="var(--brand-accent)" 
                      />
                    </>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card-polish p-6 card-shadow">
                  <h3 className={`text-xl font-black text-[var(--brand-primary)] mb-6 ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>مقارنة سنوية دقيقة (2024-2025)</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={wilayatComparison}>
                        <XAxis dataKey="name" hide />
                        <YAxis tick={{ fill: 'var(--text-muted)' }} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: '12px' }}
                          formatter={(value) => [value?.toLocaleString(), 'نسمة']}
                        />
                        <Legend />
                        <Bar dataKey="2024" name="سنة 2024" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="2025" name="سنة 2025" fill="var(--brand-primary)" radius={[4, 4, 0, 0]} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="card-polish p-6 card-shadow relative overflow-hidden">
                  {/* Decorative Flourish icon background */}
                  <div className="absolute -bottom-6 -left-6 opacity-[0.03] scale-150 rotate-12">
                    <KhanjarIcon />
                  </div>
                  <h3 className={`text-xl font-black text-[var(--brand-primary)] mb-6 ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>تحليل التركيبة الديموغرافية</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'عمانيين', value: wilayatComparison[0]?.omani_2025 || 0 },
                            { name: 'وافدين', value: wilayatComparison[0]?.expat_2025 || 0 },
                          ]}
                          innerRadius={80}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" strokeWidth={2} stroke="#fff" />
                          <Cell fill="#ef4444" strokeWidth={2} stroke="#fff" />
                          <Label 
                            position="center"
                            content={(props) => (
                              <text x={props.viewBox.cx} y={props.viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={props.viewBox.cx} dy="-0.5em" fontSize="12" fill="var(--text-muted)" fontWeight="bold">إجمالي</tspan>
                                <tspan x={props.viewBox.cx} dy="1.5em" fontSize="20" fill="var(--brand-primary)" fontWeight="black">{wilayatComparison[0]?.['2025']?.toLocaleString()}</tspan>
                              </text>
                            )}
                          />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="card-polish p-6 card-shadow">
                <h3 className={`text-lg font-black text-[var(--brand-primary)] mb-4 ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>ملخص التغيرات البارزة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-ui)]">
                    <div className="text-emerald-600 font-black text-sm mb-1">أعلى نمو</div>
                    <div className="text-lg font-bold">{wilayatComparison[0]?.name}</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">سجلت هذه الولاية تغيراً بنسبة {wilayatComparison[0]?.growth}% خلال العام.</div>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-ui)]">
                    <div className="text-blue-600 font-black text-sm mb-1">التوازن الوطني</div>
                    <div className="text-lg font-bold">{((wilayatComparison[0]?.omani_2025 || 0) / (wilayatComparison[0]?.['2025'] || 1) * 100).toFixed(1)}%</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">نسبة المواطنين العمانيين من إجمالي سكان الولاية في 2025.</div>
                  </div>
                  <div className="bg-[var(--bg-surface)] p-4 rounded-xl border border-[var(--border-ui)]">
                    <div className="text-red-600 font-black text-sm mb-1">القوى العاملة الوافدة</div>
                    <div className="text-lg font-bold">{((wilayatComparison[0]?.expat_2025 || 0) / (wilayatComparison[0]?.['2025'] || 1) * 100).toFixed(1)}%</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1">نسبة الوافدين المقيمين في الولاية حسب بيانات 2025.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6"
            >
              {/* Summary KPIs Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card-polish p-5 card-shadow border-t-4 border-[var(--brand-primary)] bg-white/80">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider block mb-1">إجمالي السكان 2024</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[var(--brand-primary)]">{DATA_2024.total.toLocaleString()}</span>
                    <span className="text-[10px] font-bold opacity-60">نسمة</span>
                  </div>
                </div>
                <div className="card-polish p-5 card-shadow border-t-4 border-[var(--brand-primary)] bg-white/80">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider block mb-1">إجمالي السكان 2025</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[var(--brand-primary)]">{DATA_2025.total.toLocaleString()}</span>
                    <span className="text-[10px] font-bold opacity-60">نسمة</span>
                  </div>
                </div>
                <div className="card-polish p-5 card-shadow border-t-4 border-emerald-500 bg-white/80">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider block mb-1">الزيادة العددية</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-600">+{ (DATA_2025.total - DATA_2024.total).toLocaleString() }</span>
                    <TrendingUp size={14} className="text-emerald-500" />
                  </div>
                </div>
                <div className="card-polish p-5 card-shadow border-t-4 border-[var(--brand-accent)] bg-white/80">
                  <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-wider block mb-1">معدل النمو السنوي</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[var(--brand-accent)]">0.55%</span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Main Visualizations Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Nationality Distribution Card */}
                <div className="card-polish p-6 card-shadow">
                  <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-ui)] pb-3">
                    <Globe size={18} className="text-[var(--brand-primary)]" />
                    <h3 className={`text-lg font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>التشكيل الديموغرافي (عماني / وافد)</h3>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] mb-2 px-1">
                        <span>إحصاء 2024</span>
                        <span>{((DATA_2024.omani / DATA_2024.total)*100).toFixed(1)}% عماني</span>
                      </div>
                      <div className="w-full h-8 bg-[var(--bg-surface)] rounded-full overflow-hidden flex border border-[var(--border-ui)] shadow-inner">
                        <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${(DATA_2024.omani / DATA_2024.total * 100)}%` }}></div>
                        <div className="h-full bg-red-700 transition-all duration-1000" style={{ width: `${(DATA_2024.expat / DATA_2024.total * 100)}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] mb-2 px-1">
                        <span>إحصاء 2025</span>
                        <span>{((DATA_2025.omani / DATA_2025.total)*100).toFixed(1)}% عماني</span>
                      </div>
                      <div className="w-full h-10 bg-[var(--bg-surface)] rounded-full overflow-hidden flex border-2 border-[var(--brand-primary)]/20 shadow-md">
                        <div className="h-full bg-blue-600 transition-all duration-1000 flex items-center justify-center text-[10px] text-white font-black" style={{ width: `${(DATA_2025.omani / DATA_2025.total * 100)}%` }}>{ (DATA_2025.omani / DATA_2025.total * 100).toFixed(1) }%</div>
                        <div className="h-full bg-red-700 transition-all duration-1000 flex items-center justify-center text-[10px] text-white font-black" style={{ width: `${(DATA_2025.expat / DATA_2025.total * 100)}%` }}>{ (DATA_2025.expat / DATA_2025.total * 100).toFixed(1) }%</div>
                      </div>
                    </div>

                    <div className="flex justify-center gap-10 pt-2">
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                         <span className="text-xs font-black text-[var(--text-main)]">مواطنون</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-red-700"></div>
                         <span className="text-xs font-black text-[var(--text-main)]">وافدون</span>
                       </div>
                    </div>
                  </div>
                </div>

                {/* Gender Distribution Card */}
                <div className="card-polish p-6 card-shadow">
                  <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-ui)] pb-3">
                    <Users size={18} className="text-[var(--brand-primary)]" />
                    <h3 className={`text-lg font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>التوازن النوعي (2025)</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    <div className="flex flex-col gap-6">
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <span className="text-[10px] font-black text-blue-700 uppercase block mb-1">الذكور</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-blue-900">{(342726).toLocaleString()}</span>
                          <span className="text-xs font-bold text-blue-700">64.4%</span>
                        </div>
                      </div>
                      <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                        <span className="text-[10px] font-black text-red-700 uppercase block mb-1">الإناث</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-red-900">{(189793).toLocaleString()}</span>
                          <span className="text-xs font-bold text-red-700">35.6%</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center p-4 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-ui)] border-dashed">
                       <span className="text-[10px] font-bold text-[var(--text-muted)] mb-4">كثافة النمو (النوع)</span>
                       <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                             <circle cx="64" cy="64" r="54" fill="transparent" stroke="var(--border-ui)" strokeWidth="12" />
                             <circle cx="64" cy="64" r="54" fill="transparent" stroke="#1d4ed8" strokeWidth="12" strokeDasharray="340" strokeDashoffset={340 - (340 * 0.644)} strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-xl font-black text-[var(--brand-primary)]">64%</span>
                             <span className="text-[8px] font-bold opacity-60">نسمة</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Wilayats Insight */}
                <div className="card-polish p-5 card-shadow border-r-4 border-[var(--brand-primary)] group hover:bg-[var(--brand-primary)] hover:text-white transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="group-hover:text-white text-[var(--brand-primary)]" />
                    <h4 className="font-black text-sm">تحليل الولايات</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 group-hover:text-white text-[var(--text-muted)]">
                    سجلت ولاية <span className="font-bold">شليم</span> أعلى نمو بنسبة 11.3%، بينما شهدت <span className="font-bold">المزيونة</span> استقراراً للمواطنين بزيادة 7.0%.
                  </p>
                </div>

                {/* 2. Age Insight */}
                <div className="card-polish p-5 card-shadow border-r-4 border-amber-500 group hover:bg-amber-600 hover:text-white transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={18} className="group-hover:text-white text-amber-600" />
                    <h4 className="font-black text-sm">الفئات العمرية</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 group-hover:text-white text-[var(--text-muted)]">
                    المجتمع في محافظة ظفار يتسم بالفتوة، حيث تشكل الفئة العمرية <span className="font-bold">15-44 سنة</span> الركيزة الأساسية للتركيبة السكانية.
                  </p>
                </div>

                {/* 3. Gender Insight */}
                <div className="card-polish p-5 card-shadow border-r-4 border-emerald-500 group hover:bg-emerald-600 hover:text-white transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={18} className="group-hover:text-white text-emerald-600" />
                    <h4 className="font-black text-sm">التوازن النوعي</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 group-hover:text-white text-[var(--text-muted)]">
                    توازن مثالي بين المواطنين (51% ذكور / 49% إناث)، مع تحسن في أعداد الإناث المواطنات بنسبة نمو بلغت 3.1%.
                  </p>
                </div>

                {/* 4. Composition Insight */}
                <div className="card-polish p-5 card-shadow border-r-4 border-blue-500 group hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={18} className="group-hover:text-white text-blue-600" />
                    <h4 className="font-black text-sm">تركيبة السكان</h4>
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-90 group-hover:text-white text-[var(--text-muted)]">
                    ارتفعت حصة المواطنين إلى <span className="font-bold">45.9%</span>، مما يعكس نجاح سياسات التوطين والاستقرار السكاني في المحافظة.
                  </p>
                </div>
              </div>

              {/* Secondary Context Bar */}
              <div className="card-polish p-4 border border-[var(--border-ui)] border-dashed flex justify-between items-center bg-gray-50/30">
                 <div className="flex items-center gap-4">
                    <div className="text-[10px] font-bold text-[var(--text-muted)] italic">أهم الولايات نمواً:</div>
                    <div className="flex gap-4">
                       {wilayatComparison.slice(0, 3).map(w => (
                         <div key={w.name} className="flex items-center gap-1">
                           <span className="text-[11px] font-black">{w.name}</span>
                           <span className="text-[11px] font-bold text-red-700">({w.growth}%)</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wilayats' && (
            <motion.div
              key="wilayats"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div className="card-polish p-8 card-shadow">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[var(--border-ui)] pb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>توزيع السكان حسب الولايات ({selectedYear})</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-black">
                       {selectedNatAge === 'omani' ? 'عمانيون' : selectedNatAge === 'expat' ? 'وافدون' : 'إجمالي'} | {selectedGenderAge === 'male' ? 'ذكور' : selectedGenderAge === 'female' ? 'إناث' : 'الكل'}
                    </p>
                  </div>
                </div>
                <div className="h-[550px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={wilayatComparison}
                      margin={{ top: 20, right: 180, left: 150, bottom: 20 }}
                      barCategoryGap="25%"
                      barGap={5}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-ui)" strokeWidth={1} />
                      <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontWeight: '700', fontSize: 13 }} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} tickLine={{ stroke: 'var(--brand-primary)', strokeWidth: 2 }} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        orientation="right" 
                        axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }}
                        tickLine={false} 
                        width={140} 
                        tick={{ fill: 'var(--text-main)', fontWeight: '900', fontSize: 16, textAnchor: 'start' }} 
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: '12px', fontWeight: 'bold' }}
                        itemStyle={{ color: 'var(--brand-primary)', fontSize: '14px' }}
                        formatter={(value) => [value?.toLocaleString() ?? '0', 'نسمة']} 
                      />
                      {selectedYear === 'compare' ? (
                        <>
                          <Legend verticalAlign="top" height={40} wrapperStyle={{ fontWeight: '900', color: 'var(--brand-primary)', fontSize: '14px' }} formatter={(value) => <span className="mx-3">{value}</span>} />
                          <Bar dataKey="2024" name="إجمالي 2024" fill="#94a3b8" stroke="#475569" strokeWidth={1.5} radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: 'var(--brand-primary)', fontSize: 11, fontWeight: '900', formatter: (v: any) => v.toLocaleString() }} />
                          <Bar dataKey="2025" name="إجمالي 2025" fill="#ef4444" stroke="#991b1b" strokeWidth={1.5} radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: 'var(--brand-primary)', fontSize: 11, fontWeight: '900', formatter: (v: any) => v.toLocaleString() }} />
                        </>
                      ) : (
                        <Bar 
                          dataKey={selectedYear} 
                          fill={selectedYear === '2024' ? '#3b82f6' : '#ef4444'} 
                          stroke={selectedYear === '2024' ? '#1d4ed8' : '#991b1b'}
                          strokeWidth={2}
                          radius={[0, 6, 6, 0]} 
                          barSize={32} 
                        >
                        <Label 
                          content={(props: any) => {
                            const { x, y, width, height, value } = props;
                            if (isNaN(x) || isNaN(y)) return null;
                            return (
                              <text 
                                x={x - 20} 
                                y={y + height / 2} 
                                fill="var(--brand-primary)" 
                                textAnchor="end" 
                                dominantBaseline="middle" 
                                fontWeight="900" 
                                fontSize="18"
                              >
                                {value?.toLocaleString() ?? '0'}
                              </text>
                            );
                          }}
                        />
                        </Bar>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'composition' && (
            <motion.div
              key="composition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-polish p-8 card-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[var(--border-ui)] pb-4 gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className={`text-xl font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>تركيبة السكان (عمانيون vs وافدون) - {selectedYear === 'compare' ? 'مقارنة' : selectedYear}</h3>
                  <p className="text-[10px] text-[var(--text-muted)] font-bold">
                    فلتر النوع الحالي: {selectedGenderAge === 'male' ? 'ذكور فقط' : selectedGenderAge === 'female' ? 'إناث فقط' : 'الكل'}
                  </p>
                </div>
              </div>
              <div className="h-[550px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={wilayatComparison}
                    margin={{ top: 20, right: 180, left: 150, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-ui)" strokeWidth={1} />
                    <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontWeight: '700', fontSize: 13 }} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} />
                    <YAxis dataKey="name" type="category" orientation="right" width={140} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} tick={{ fill: 'var(--text-main)', fontWeight: '900', fontSize: 16, textAnchor: 'start' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: '12px', fontWeight: 'bold' }}
                      itemStyle={{ color: 'var(--brand-primary)', fontSize: '14px' }}
                      formatter={(value) => value?.toLocaleString() ?? '0'} 
                    />
                    <Legend verticalAlign="top" height={40} wrapperStyle={{ fontWeight: '900', color: 'var(--brand-primary)', fontSize: '14px' }} formatter={(value) => <span className="mx-3">{value}</span>} />
                    {selectedYear === 'compare' ? (
                      <>
                        <Bar dataKey="omani_2024" name="عمانيون 2024" stackId="2024" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={1} />
                        <Bar dataKey="expat_2024" name="وافدون 2024" stackId="2024" fill="#94a3b8" stroke="#475569" strokeWidth={1} />
                        <Bar dataKey="omani_2025" name="عمانيون 2025" stackId="2025" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
                        <Bar dataKey="expat_2025" name="وافدون 2025" stackId="2025" fill="#b91c1c" stroke="#7f1d1d" strokeWidth={2} />
                      </>
                    ) : (
                      <>
                        <Bar dataKey={`omani_${selectedYear}`} name="عمانيون" stackId="a" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
                        <Bar dataKey={`expat_${selectedYear}`} name="وافدون" stackId="a" fill="#b91c1c" stroke="#7f1d1d" strokeWidth={2} />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

            {activeTab === 'gender' && (
              <motion.div
                key="gender"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-polish p-8 card-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[var(--border-ui)] pb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>توزيع النوع الاجتماعي (ذكور vs إناث) - {selectedYear === 'compare' ? 'مقارنة' : selectedYear}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold">
                      فلتر الجنسية الحالي: {selectedNatAge === 'omani' ? 'عمانيون فقط' : selectedNatAge === 'expat' ? 'وافدون فقط' : 'الكل'}
                    </p>
                  </div>
                </div>
                <div className="h-[550px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={wilayatComparison}
                      margin={{ top: 20, right: 180, left: 150, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="var(--border-ui)" strokeWidth={1} />
                      <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontWeight: '700', fontSize: 13 }} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} />
                      <YAxis dataKey="name" type="category" orientation="right" width={140} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} tick={{ fill: 'var(--text-main)', fontWeight: '900', fontSize: 16, textAnchor: 'start' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: '12px', fontWeight: 'bold' }}
                        itemStyle={{ color: 'var(--brand-primary)', fontSize: '14px' }}
                        formatter={(value) => value?.toLocaleString() ?? '0'} 
                      />
                      <Legend verticalAlign="top" height={40} wrapperStyle={{ fontWeight: '900', color: 'var(--brand-primary)', fontSize: '14px' }} formatter={(value) => <span className="mx-3">{value}</span>} />
                      {selectedYear === 'compare' ? (
                        <>
                          <Bar dataKey="male_2024" name="ذكور 2024" stackId="2024" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={1} />
                          <Bar dataKey="female_2024" name="إناث 2024" stackId="2024" fill="#f87171" stroke="#ef4444" strokeWidth={1} />
                          <Bar dataKey="male_2025" name="ذكور 2025" stackId="2025" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
                          <Bar dataKey="female_2025" name="إناث 2025" stackId="2025" fill="#b91c1c" stroke="#7f1d1d" strokeWidth={2} />
                        </>
                      ) : (
                        <>
                          <Bar dataKey={`male_${selectedYear}`} name="ذكور" stackId="a" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
                          <Bar dataKey={`female_${selectedYear}`} name="إناث" stackId="a" fill="#b91c1c" stroke="#7f1d1d" strokeWidth={2} />
                        </>
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
            {activeTab === 'age' && (
              <motion.div
                key="age"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-polish p-8 card-shadow"
              >
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-[var(--border-ui)] pb-4 gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className={`text-xl font-black text-[var(--brand-primary)] ${theme === 'royal' ? 'font-serif' : 'font-sans'}`}>توزيع الفئات العمرية - {selectedYear === 'compare' ? 'مقارنة' : selectedYear}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold">
                      {selectedWilayatAge === 'all' ? 'عرض إجمالي المحافظة' : `بيانات فعلية لولاية ${selectedWilayatAge}`}
                    </p>
                  </div>
                </div>
                <div className="h-[550px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={ageGroupData}
                      margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-ui)" strokeWidth={1} />
                      <XAxis dataKey="range" tick={{ fill: 'var(--text-muted)', fontWeight: '700', fontSize: 13 }} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} />
                      <YAxis tick={{ fill: 'var(--text-muted)', fontWeight: '700', fontSize: 13 }} axisLine={{ stroke: 'var(--brand-primary)', strokeWidth: 1.5 }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-card)', border: '2px solid var(--brand-primary)', borderRadius: '12px', fontWeight: 'bold' }}
                        itemStyle={{ color: 'var(--brand-primary)', fontSize: '14px' }}
                        formatter={(value) => value?.toLocaleString() ?? '0'} 
                      />
                      <Legend verticalAlign="top" height={40} wrapperStyle={{ fontWeight: '900', color: 'var(--brand-primary)', fontSize: '14px' }} formatter={(value) => <span className="mx-3">{value}</span>} />
                      {selectedYear === 'compare' ? (
                        <>
                          <Bar dataKey="total_2024" name="إجمالي 2024" fill="#94a3b8" stroke="#475569" strokeWidth={1.5} />
                          <Bar dataKey="total_2025" name="إجمالي 2025" fill="#ef4444" stroke="#991b1b" strokeWidth={1.5} />
                          <Line type="monotone" dataKey="total_2025" stroke="var(--brand-primary)" strokeWidth={4} dot={{ r: 6, fill: 'var(--brand-primary)', strokeWidth: 2, stroke: '#fff' }} name="منحنى النمو" />
                        </>
                      ) : (
                        <>
                          <Bar dataKey="male" name="ذكور" stackId="a" fill="#3b82f6" stroke="#1d4ed8" strokeWidth={2} />
                          <Bar dataKey="female" name="إناث" stackId="a" fill="#b91c1c" stroke="#7f1d1d" strokeWidth={2} />
                          <Line type="monotone" dataKey="total" stroke="var(--brand-primary)" strokeWidth={4} dot={{ r: 6, fill: 'var(--brand-primary)', strokeWidth: 2, stroke: '#fff' }} name="توزيع الفئات" />
                        </>
                      )}
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12 pt-8 border-t border-[var(--border-ui)] flex flex-col md:flex-row justify-between items-center gap-6 opacity-70">
        <div className="flex items-center gap-4">
          <LubanTreeIcon />
          <div className="text-right">
            <p className="font-bold text-[var(--brand-primary)]">محافظة ظفار</p>
            <p className="text-xs text-[var(--text-muted)]">Census Report 2025</p>
          </div>
        </div>
        <div className="text-center text-[10px] text-[var(--text-muted)]">
          تم إعداد هذا التقرير بناء على مؤشرات وزارة الصحة -2024 و 2025
        </div>
        <div className="text-left text-xs font-black text-[var(--brand-primary)]">
          سلطنة عمان - المديرية العامة للخدمات الصحية بمحافظة ظفار
        </div>
      </footer>
      
      {/* Decorative Ornaments */}
      <div className="fixed bottom-10 left-10 opacity-20 pointer-events-none drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
        <LubanTreeIcon />
      </div>
    </div>
  );
}
